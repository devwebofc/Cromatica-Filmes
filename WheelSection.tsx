import React, { useEffect, useRef } from 'react'
import styles from '../styles.module.css'

export const WheelSection: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animId: number
    let currentAngle = 0
    let targetAngle = 0
    let isSpinning = false

    const handleScroll = () => {
      targetAngle = window.scrollY * 0.1
      if (!isSpinning) {
        isSpinning = true
        animId = requestAnimationFrame(rotate)
      }
    }

    const rotate = () => {
      currentAngle += (targetAngle - currentAngle) * 0.08
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${currentAngle}deg)`
      }
      if (Math.abs(targetAngle - currentAngle) > 0.05) {
        animId = requestAnimationFrame(rotate)
      } else {
        isSpinning = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className={styles.wh} id="filmes">
      <div className="w">
        <div ref={wheelRef} className={styles.wheel} id="wl" />
        <div className={styles.hub}>
          <h2>E agora, os filmes</h2>
          <p>Doze notas, doze cores, seis histórias.</p>
        </div>
      </div>
    </section>
  )
}
