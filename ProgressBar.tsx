import React, { useEffect, useState } from 'react'

export const ProgressBar: React.FC = () => {
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = window.innerHeight
      const total = document.documentElement.scrollHeight - h
      if (total <= 0) return
      const current = Math.max(0, Math.min(1, window.scrollY / total))
      setScale(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div
      className="pg"
      id="pg"
      style={{ transform: `scaleX(${scale})` }}
    />
  )
}
