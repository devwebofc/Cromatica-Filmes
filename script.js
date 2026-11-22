// Configurações do CMS Sanity e funções de apoio
export const CMS_CONFIG = {
  projectId: 'dcjbomwv',
  dataset: 'production',
}

export function safeUrl(u) {
  if (!u) return null
  try {
    const x = new URL(u)
    return x.protocol === 'https:' ? x.href : null
  } catch (e) {
    return null
  }
}

// YouTube ou Vimeo -> URL de embed. Vimeo oculto: o código vai em ?h=
export function embedUrl(u) {
  const s = safeUrl(u)
  if (!s) return null
  try {
    const x = new URL(s)
    const host = x.hostname.replace(/^www\./, '')
    let m, id
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
    return id && /^[\w-]{11}$/.test(id)
      ? 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0'
      : null
  } catch (e) {
    return null
  }
}

// YouTube -> ID do vídeo (null para Vimeo ou links inválidos)
export function youtubeId(u) {
  const s = safeUrl(u)
  if (!s) return null
  try {
    const x = new URL(s)
    const host = x.hostname.replace(/^www\./, '')
    let m, id
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
    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch (e) {
    return null
  }
}

// Capa do vídeo: maxres (1280x720) e, se não existir, hqdefault
export function youtubeThumb(id, quality = 'maxresdefault') {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

export const CARD_COLORS = [
  ['#E3000B', '#fff'],
  ['#FFE600', '#17171B'],
  ['#2E4BFF', '#fff'],
  ['#1FC48D', '#17171B'],
  ['#9A4DDB', '#fff'],
  ['#17171B', '#fff'],
]

export const TILE_COLORS = ['#E3000B', '#2E4BFF', '#FF9A1F', '#1FC48D', '#9A4DDB', '#D63384']
export const TILE_X = [30, 70, 45, 25, 75, 50]
export const TILE_Y = [28, 22, 35, 60, 45, 20]

export const DEFAULT_FILMES = [
  {
    _id: '1',
    title: 'Pestana e Rastilho',
    description: 'Curta-metragem inspirado no livro didático musical Pestana e Rastilho, feito para encantar o público infantil, com atores mirins de Patrocínio.',
    videoUrl: 'https://www.youtube.com/watch?v=T3-1M0ONxPA',
  },
  {
    _id: '2',
    title: 'Cromática Cast',
    description: 'Bate-papo musical e lançamento dos clipes dos nossos alunos.',
    videoUrl: 'https://www.youtube.com/watch?v=8ycLrZ9E0NU',
  },
  {
    _id: '3',
    title: 'Aquarela do Brasil',
    description: 'O amor do compositor pelo Brasil, contado em samba-exaltação, no estilo de uma época que glorificava um país lindo e grandioso.',
    videoUrl: 'https://www.youtube.com/watch?v=JcAW8J3dQAk',
  },
  {
    _id: '4',
    title: 'Idontwannabeyouanymore',
    description: 'Na voz de Isabela Bernardes, aluna da escola: timbre, dinâmica, precisão rítmica e afinação a serviço de uma interpretação alegre e elegante.',
    videoUrl: 'https://www.youtube.com/watch?v=lyGaYrQ1MwM',
  },
  {
    _id: '5',
    title: 'Encantando os bons velhinhos',
    description: 'Projeto em parceria com Jornal Gazeta, Agência Portfólio, Alva Filmes, Gráfica A3, União e Unicerp.',
    videoUrl: 'https://www.youtube.com/watch?v=RTwB4OXUHvg',
  },
  {
    _id: '6',
    title: 'A Paz, de Roupa Nova',
    description: 'Só o amor salva. Nossos alunos compartilham dessa ideia e fizeram este vídeo para mostrar isso.',
    videoUrl: 'https://www.youtube.com/watch?v=AJljA6w5h5A',
  },
]

export const DEFAULT_NOVELAS = [
  {
    _id: '1',
    title: 'Notas de Domingo',
    genre: 'Drama',
    episodes: 40,
    status: 'Concluída',
    synopsis: 'Uma professora de música volta à cidade natal e reencontra a escola onde tudo começou.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
  {
    _id: '2',
    title: 'Fio de Prata',
    genre: 'Romance',
    episodes: 32,
    status: 'Concluída',
    synopsis: 'Dois músicos de gerações diferentes descobrem que uma antiga canção une as duas famílias.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
  {
    _id: '3',
    title: 'A Última Partitura',
    genre: 'Suspense',
    episodes: 28,
    status: 'Em produção',
    synopsis: 'Uma partitura desaparece na véspera do grande festival e todos na escola viram suspeitos.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
  {
    _id: '4',
    title: 'Coração de Cerrado',
    genre: 'Família',
    episodes: 60,
    status: 'Concluída',
    synopsis: 'Três irmãos disputam a herança de um sítio e aprendem a tocar juntos o que a vida separou.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
  {
    _id: '5',
    title: 'Sol de Maio',
    genre: 'Comédia',
    episodes: 24,
    status: 'Concluída',
    synopsis: 'A turma de canto monta um musical às pressas e tudo o que podia dar errado dá certo.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
  {
    _id: '6',
    title: 'Maré Mansa',
    genre: 'Drama',
    episodes: 36,
    status: 'Em produção',
    synopsis: 'Uma jovem compositora deixa a cidade grande para recomeçar e encontra um coral inesperado.',
    watchUrl: 'https://www.youtube.com/@cromaticaescolademusica8188',
  },
]

export async function fetchSanityList(type) {
  if (!CMS_CONFIG.projectId) {
    return null
  }
  const api = `https://${CMS_CONFIG.projectId}.apicdn.sanity.io/v2024-01-01/data/query/${CMS_CONFIG.dataset || 'production'}`
  const queries = {
    filmes: '*[_type == "filme" && published == true] | order(order asc) {_id, title, description, videoUrl}',
    novelas: '*[_type == "novela" && published == true] | order(order asc) {_id, title, genre, episodes, status, synopsis, watchUrl, "cover": cover.asset->url}',
  }
  const q = queries[type]
  if (!q) return null

  const ctl = new AbortController()
  const to = setTimeout(() => ctl.abort(), 6000)

  try {
    const res = await fetch(`${api}?query=${encodeURIComponent(q)}`, { signal: ctl.signal })
    clearTimeout(to)
    if (!res.ok) throw new Error('Sanity error')
    const json = await res.json()
    try {
      localStorage.setItem(`cromatica:${type}:v1`, JSON.stringify(json.result))
    } catch (e) {}
    return json.result
  } catch (err) {
    clearTimeout(to)
    try {
      const cached = localStorage.getItem(`cromatica:${type}:v1`)
      if (cached) return JSON.parse(cached)
    } catch (e) {}
    throw err
  }
}
