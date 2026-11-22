import React, { useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  embedUrl: string | null
  externalUrl: string | null
  onClose: () => void
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  embedUrl,
  externalUrl,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !embedUrl) return null

  return (
    <div
      className="pm open"
      role="dialog"
      aria-modal="true"
      aria-label="Player de vídeo"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        className="x"
        type="button"
        aria-label="Fechar vídeo"
        onClick={onClose}
      >
        ×
      </button>
      <div className="pw">
        <div className="pf">
          <iframe
            src={embedUrl}
            title="Vídeo"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {externalUrl && (
          <a
            className="ext"
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir em outra aba ↗
          </a>
        )}
      </div>
    </div>
  )
}
