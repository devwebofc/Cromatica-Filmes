/* Integração com o Sanity (leitura pública) + player sob demanda.
   Sem dependências. Vale para os tipos "filme" e "novela". */
(function () {
  var CFG = window.CMS_CONFIG || {}
  var API = CFG.projectId
    ? 'https://' + CFG.projectId + '.apicdn.sanity.io/v2024-01-01/data/query/' + (CFG.dataset || 'production')
    : null

  var QUERIES = {
    filmes:
      '*[_type == "filme" && published == true] | order(order asc) {_id, title, description, videoUrl}',
    novelas:
      '*[_type == "novela" && published == true] | order(order asc) {_id, title, genre, episodes, status, synopsis, watchUrl, "cover": cover.asset->url}',
  }
  var CARD_COLORS = [['#E3000B', '#fff'], ['#FFE600', '#17171B'], ['#2E4BFF', '#fff'], ['#1FC48D', '#17171B'], ['#9A4DDB', '#fff'], ['#17171B', '#fff']]
  var TILE_COLORS = ['#E3000B', '#2E4BFF', '#FF9A1F', '#1FC48D', '#9A4DDB', '#D63384']
  var TILE_X = [30, 70, 45, 25, 75, 50]
  var TILE_Y = [28, 22, 35, 60, 45, 20]

  /* ---------- utilitários ---------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag)
    for (var k in attrs || {}) el.setAttribute(k, attrs[k])
    ;(kids || []).forEach(function (c) {
      if (c == null) return
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
    })
    return el
  }
  function safeUrl(u) {
    try {
      var x = new URL(u)
      return x.protocol === 'https:' ? x.href : null
    } catch (e) {
      return null
    }
  }
  // YouTube ou Vimeo -> URL de embed. Vimeo oculto: o código vai em ?h=
  function embedUrl(u) {
    var s = safeUrl(u)
    if (!s) return null
    var x = new URL(s), host = x.hostname.replace(/^www\./, ''), m, id
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      m = /\/(\d+)(?:\/([a-zA-Z0-9]+))?/.exec(x.pathname)
      if (!m) return null
      return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1&dnt=1' + (m[2] ? '&h=' + m[2] : '')
    }
    if (host === 'youtu.be') {
      m = /^\/([\w-]{11})/.exec(x.pathname)
      id = m && m[1]
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (x.pathname === '/watch') id = x.searchParams.get('v')
      else {
        m = /^\/(?:embed|shorts|live)\/([\w-]{11})/.exec(x.pathname)
        id = m && m[1]
      }
    }
    return id && /^[\w-]{11}$/.test(id) ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' : null
  }
  function pad(n) { return (n < 10 ? '0' : '') + n }
  function readCache(t) {
    try { return JSON.parse(localStorage.getItem('cromatica:' + t + ':v1')) || [] } catch (e) { return [] }
  }
  function writeCache(t, list) {
    try { localStorage.setItem('cromatica:' + t + ':v1', JSON.stringify(list)) } catch (e) {}
  }
  function fetchList(t) {
    var ctl = new AbortController(), to = setTimeout(function () { ctl.abort() }, 6000)
    return fetch(API + '?query=' + encodeURIComponent(QUERIES[t]), {signal: ctl.signal})
      .then(function (r) {
        if (!r.ok) throw new Error('Sanity indisponível')
        return r.json()
      })
      .then(function (j) {
        clearTimeout(to)
        writeCache(t, j.result)
        return j.result
      }, function (e) {
        clearTimeout(to)
        throw e
      })
  }

  /* ---------- renderização (sempre com textContent, nunca innerHTML) ---------- */
  function playLink(cls, url, label) {
    var u = safeUrl(url)
    if (!u) return null
    return h('a', {class: cls, href: u, target: '_blank', rel: 'noopener', 'data-play': ''}, [label])
  }
  function renderFilmes(list, box) {
    list.forEach(function (f, i) {
      var c = CARD_COLORS[i % CARD_COLORS.length]
      box.appendChild(
        h('article', {class: 'st', style: '--i:' + Math.min(i, 8) + ';--c:' + c[0] + ';--t:' + c[1]}, [
          h('div', {class: 'ord'}, [pad(i + 1) + '/']),
          h('div', {}, [
            h('h3', {}, [f.title || '']),
            f.description ? h('p', {}, [f.description]) : null,
            playLink('pill', f.videoUrl, 'Assistir ↗'),
          ]),
        ])
      )
    })
  }
  function renderNovelas(list, box) {
    list.forEach(function (n, i) {
      var k = i % 6
      var cover = n.cover && safeUrl(n.cover)
      var media = cover
        ? h('img', {src: cover + '?w=700&auto=format', alt: '', loading: 'lazy'})
        : h('div', {class: 'im', 'aria-hidden': 'true'})
      var meta = [n.genre, n.episodes ? n.episodes + ' episódios' : null, n.status].filter(Boolean).join(' · ')
      box.appendChild(
        h('article', {class: 'nt', tabindex: '0', style: '--c:' + TILE_COLORS[k] + ';--a:' + TILE_X[k] + '%;--b:' + TILE_Y[k] + '%'}, [
          media,
          h('div', {class: 'tx'}, [
            h('div', {class: 'in'}, [
              h('span', {}, [meta]),
              n.synopsis ? h('p', {}, [n.synopsis]) : null,
              playLink('', n.watchUrl, 'Assistir ↗'),
            ]),
            h('h3', {}, [n.title || '']),
          ]),
        ])
      )
    })
  }
  var RENDER = {filmes: renderFilmes, novelas: renderNovelas}

  /* ---------- carregamento: Sanity -> cache -> conteúdo estático ---------- */
  function boot() {
    if (!API) return // modo demonstração: fica o conteúdo do index.html
    document.querySelectorAll('[data-cms]').forEach(function (box) {
      var t = box.getAttribute('data-cms'), keep = box.getAttribute('data-fallback') === 'keep'
      var section = box.closest('[data-block]') || box.closest('section'), original = box.innerHTML
      function show(list, fromCache) {
        box.innerHTML = ''
        if (!list.length) {
          if (section) section.hidden = true
          return
        }
        if (section) section.hidden = false
        RENDER[t](list, box)
        if (!fromCache) document.querySelectorAll('[data-demo]').forEach(function (d) { d.remove() })
      }
      box.setAttribute('aria-busy', 'true')
      box.style.minHeight = '12rem'
      fetchList(t)
        .then(function (l) { show(l, false) })
        .catch(function () {
          var c = readCache(t)
          if (c.length) show(c, true)
          else if (keep) box.innerHTML = original
          else if (section) section.hidden = true
        })
        .then(function () {
          box.removeAttribute('aria-busy')
          box.style.minHeight = ''
        })
    })
  }

  /* ---------- player sob demanda (o iframe só existe depois do clique) ---------- */
  var pm, last
  function closePlayer() {
    if (!pm) return
    pm.classList.remove('open')
    pm.querySelector('.pf').innerHTML = '' // remove o iframe e o áudio junto
    if (last) last.focus()
  }
  function openPlayer(src, ext, from) {
    if (!pm) {
      pm = h('div', {class: 'pm', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Player de vídeo'}, [
        h('button', {class: 'x', type: 'button', 'aria-label': 'Fechar vídeo'}, ['×']),
        h('div', {class: 'pw'}, [h('div', {class: 'pf'}), h('a', {class: 'ext', target: '_blank', rel: 'noopener'}, ['Abrir em outra aba ↗'])]),
      ])
      pm.addEventListener('click', function (e) {
        if (e.target === pm || e.target.closest('.x')) closePlayer()
      })
      document.body.appendChild(pm)
    }
    last = from
    pm.querySelector('.ext').setAttribute('href', ext)
    var pf = pm.querySelector('.pf')
    pf.innerHTML = ''
    pf.appendChild(h('iframe', {src: src, title: 'Vídeo', allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: ''}))
    pm.classList.add('open')
    pm.querySelector('.x').focus()
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-play]')
    if (a) {
      var s = embedUrl(a.href)
      if (s) {
        e.preventDefault()
        openPlayer(s, a.href, a)
      }
      return
    }
    // toque em uma capa de novela abre/fecha a ficha (celular)
    var t = e.target.closest && e.target.closest('.nt')
    if (t && !e.target.closest('a')) {
      var was = t.classList.contains('on')
      document.querySelectorAll('.nt.on').forEach(function (x) { x.classList.remove('on') })
      if (!was) t.classList.add('on')
    }
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePlayer()
  })

  window.CMS = {embedUrl: embedUrl, safeUrl: safeUrl}
  boot()
})()
