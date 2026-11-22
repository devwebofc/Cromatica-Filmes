import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'

export const IntroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const text = 'Tudo começou com música. Hoje também vive em curtas, séries e longas.'
  const words = text.split(/\s+/)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true)
            obs.disconnect()
          }
        },
        { threshold: 0.35 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    } else {
      setIsVisible(true)
    }
  }, [])

  return (
    <section className={styles.intro}>
      <div className="w">
        <h2
          ref={headlineRef}
          className={`${styles.rv} ${isVisible ? styles.rvGo : ''}`}
          aria-label={text}
        >
          {words.map((word, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {word}{' '}
            </span>
          ))}
        </h2>
        <div className={styles.st3}>
          <div>
            <b>10+</b>anos de história
          </div>
          <div>
            <b>5.000+</b>alunos
          </div>
          <div>
            <b>40+</b>projetos realizados
          </div>
        </div>
      </div>
    </section>
  )
}
