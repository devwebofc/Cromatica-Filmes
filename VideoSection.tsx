import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'
import videoSrc from '../../../assets/video.mp4'

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return
      const r = container.getBoundingClientRect()
      const H = window.innerHeight
      const progress = Math.max(0, Math.min(1, -r.top / (r.height - H)))
      setIsOpen(progress > 0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <section
      ref={containerRef}
      className={`${styles.vs} ${isOpen ? styles.vsOpen : ''}`}
      id="vs"
    >
      <div className={styles.vp}>
        <div className={styles.vr} id="vr">
          <span>Vamos</span>
          <div className={styles.slot} id="slot" />
          <span>assistir</span>
        </div>
        <div className={styles.vb} id="vb">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={videoSrc}
          />
          <button id="mt" type="button" onClick={toggleSound}>
            {isMuted ? 'Ativar som' : 'Desativar som'}
          </button>
        </div>
        <p className={styles.vc} id="vc">
          Aula de música na Cromática.
        </p>
      </div>
    </section>
  )
}
