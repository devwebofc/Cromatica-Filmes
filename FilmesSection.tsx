import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { CARD_COLORS, DEFAULT_FILMES, fetchSanityList, youtubeId, youtubeThumb } from '../../../script'

interface Filme {
  _id: string
  title: string
  description?: string
  videoUrl: string
}

interface FilmesSectionProps {
  onPlay: (url: string) => void
}

export const FilmesSection: React.FC<FilmesSectionProps> = ({ onPlay }) => {
  const [filmes, setFilmes] = useState<Filme[]>(DEFAULT_FILMES)

  useEffect(() => {
    let mounted = true
    fetchSanityList('filmes')
      .then((res: any) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          setFilmes(res)
        }
      })
      .catch(() => {
        // Keeps fallback DEFAULT_FILMES
      })
    return () => {
      mounted = false
    }
  }, [])

  const pad = (n: number) => (n < 10 ? '0' : '') + n

  return (
    <div data-block>
      <section className={styles.stk} data-cms="filmes">
        {filmes.map((item, i) => {
          const colorPair = CARD_COLORS[i % CARD_COLORS.length]
          const bg = colorPair[0]
          const textColor = colorPair[1]
          const topOffset = `calc(5rem + ${Math.min(i, 8)} * 1.1rem)`
          const ytId = item.videoUrl ? youtubeId(item.videoUrl) : null

          return (
            <article
              key={item._id || i}
              className={styles.st}
              style={{
                backgroundColor: bg,
                color: textColor,
                top: topOffset,
              }}
            >
              <div className={styles.ord}>{pad(i + 1)}/</div>
              <div className={styles.stContent}>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.videoUrl && (
                  <button
                    type="button"
                    className="pill"
                    style={{
                      backgroundColor: textColor,
                      color: bg,
                      alignSelf: 'flex-start',
                      marginTop: 'auto',
                    }}
                    onClick={() => onPlay(item.videoUrl)}
                  >
                    Assistir no YouTube ↗
                  </button>
                )}
              </div>
              {ytId && (
                <button
                  type="button"
                  className={styles.stThumb}
                  aria-label={`Assistir "${item.title}" no YouTube`}
                  onClick={() => onPlay(item.videoUrl)}
                >
                  <img
                    src={youtubeThumb(ytId)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget
                      const fallback = youtubeThumb(ytId, 'hqdefault')
                      if (img.src !== fallback) img.src = fallback
                    }}
                  />
                  <span className={styles.stPlay} aria-hidden="true" />
                </button>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
