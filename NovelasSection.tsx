import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { DEFAULT_NOVELAS, fetchSanityList, safeUrl, TILE_COLORS, TILE_X, TILE_Y } from '../../../script'

interface Novela {
  _id: string
  title: string
  genre?: string
  episodes?: number
  status?: string
  synopsis?: string
  watchUrl?: string
  cover?: string
}

interface NovelasSectionProps {
  onPlay: (url: string) => void
}

export const NovelasSection: React.FC<NovelasSectionProps> = ({ onPlay }) => {
  const [novelas, setNovelas] = useState<Novela[]>(DEFAULT_NOVELAS)
  const [isDemo, setIsDemo] = useState(true)
  const [activeCard, setActiveCard] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchSanityList('novelas')
      .then((res: any) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          setNovelas(res)
          setIsDemo(false)
        }
      })
      .catch(() => {
        // Keeps DEFAULT_NOVELAS
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className={styles.nv} id="novelas">
      <div className={`w ${styles.nvh}`}>
        <h2>Novelas</h2>
        <div>
          <p>As histórias em episódios criadas pela Cromática. Passe o mouse ou toque para ver os detalhes.</p>
          {isDemo && <small data-demo>(Conteúdo de teste)</small>}
        </div>
      </div>
      <div className={styles.nvx} data-cms="novelas">
        {novelas.map((n, i) => {
          const k = i % 6
          const tileColor = TILE_COLORS[k]
          const tileX = TILE_X[k]
          const tileY = TILE_Y[k]
          const coverUrl = n.cover && safeUrl(n.cover)
          const meta = [n.genre, n.episodes ? `${n.episodes} episódios` : null, n.status]
            .filter(Boolean)
            .join(' · ')
          const isActive = activeCard === (n._id || String(i))

          return (
            <article
              key={n._id || i}
              className={`${styles.nt} ${isActive ? styles.ntOn : ''}`}
              tabIndex={0}
              style={{
                ['--tile-color' as string]: tileColor,
              }}
              onClick={() => {
                setActiveCard(isActive ? null : (n._id || String(i)))
              }}
            >
              {coverUrl ? (
                <img src={`${coverUrl}?w=700&auto=format`} alt={n.title} loading="lazy" />
              ) : (
                <div
                  className={styles.im}
                  aria-hidden="true"
                  style={{
                    background: `radial-gradient(circle at ${tileX}% ${tileY}%, #ececec 0, #8a8a8a 16%, #2a2a2a 42%, #050505 76%)`,
                  }}
                />
              )}
              <div className={styles.tx}>
                <div className={styles.in}>
                  <span>{meta}</span>
                  {n.synopsis && <p>{n.synopsis}</p>}
                  {n.watchUrl && (
                    <button
                      type="button"
                      className="pill"
                      style={{
                        background: '#fff',
                        color: 'var(--ink)',
                        fontSize: '0.9rem',
                        padding: '0.5rem 1.1rem',
                        marginBottom: '1rem',
                        display: 'inline-block',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onPlay(n.watchUrl!)
                      }}
                    >
                      Assistir ↗
                    </button>
                  )}
                </div>
                <h3>{n.title}</h3>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
