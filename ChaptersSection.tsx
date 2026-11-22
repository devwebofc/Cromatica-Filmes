import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'

export const ChaptersSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const r = container.getBoundingClientRect()
      const H = window.innerHeight
      const progress = Math.max(0, Math.min(1, -r.top / (r.height - H)))
      const k = Math.min(2, Math.floor(progress * 3))
      setSlideIndex(k)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const progressPercent = (slideIndex + 1) * 33.34

  return (
    <section ref={containerRef} className={styles.hs} id="capitulos">
      <div className={styles.pin}>
        <div
          className={styles.track}
          id="tk"
          style={{ transform: `translateX(-${slideIndex * 100}vw)` }}
        >
          <div className={styles.sl}>
            <div className={styles.ord}>01/</div>
            <div>
              <h3>A escola</h3>
              <p>
                Nascemos para ensinar música com qualidade e a preço justo, para alunos de todas
                as idades. Cada curso se adapta ao ritmo e ao objetivo de quem aprende.
              </p>
            </div>
            <div className={styles.th}>
              <svg viewBox="0 0 100 100">
                <path d="M35 72V25l45-9v47" />
                <circle cx="26" cy="72" r="10" />
                <circle cx="71" cy="63" r="10" />
              </svg>
            </div>
          </div>

          <div className={styles.sl}>
            <div className={styles.ord}>02/</div>
            <div>
              <h3>Os filmes</h3>
              <p>
                A paixão pela arte saiu da sala de aula e chegou às telas. Dos pequenos projetos
                ligados à escola e à comunidade vieram curtas, séries e longas de forte apelo
                emocional.
              </p>
            </div>
            <div className={styles.th}>
              <svg viewBox="0 0 100 100">
                <rect x="10" y="26" width="80" height="48" rx="6" />
                <path d="M42 40l20 10-20 10z" />
              </svg>
            </div>
          </div>

          <div className={styles.sl}>
            <div className={styles.ord}>03/</div>
            <div>
              <h3>Hoje</h3>
              <p>
                Roteirizamos, produzimos e levamos nossas histórias a eventos e mercados
                internacionais do audiovisual. Duas linguagens, um mesmo propósito.
              </p>
            </div>
            <div className={styles.th}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" />
                <path d="M12 50h76M50 12c-24 24-24 52 0 76M50 12c24 24 24 52 0 76" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className={styles.sp}
          id="sp"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}
