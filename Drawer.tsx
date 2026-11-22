import React, { useEffect } from 'react'

export interface TeamMember {
  name: string
  role: string
  photo: string
  quote: string
}

interface DrawerProps {
  isOpen: boolean
  member: TeamMember | null
  onClose: () => void
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      <aside
        className={`dr ${isOpen ? 'open' : ''}`}
        id="dr"
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Detalhes da pessoa"
      >
        <button
          className="x"
          id="dx"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          ×
        </button>
        {member && (
          <div id="db">
            <img src={member.photo} alt={member.name} />
            <h3>{member.name}</h3>
            <div className="c">{member.role}</div>
            <q>{member.quote}</q>
          </div>
        )}
      </aside>
      <div
        className={`ov ${isOpen ? 'open' : ''}`}
        id="ov"
        onClick={onClose}
      />
    </>
  )
}
