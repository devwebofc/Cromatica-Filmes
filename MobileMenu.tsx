import React from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`mn ${isOpen ? 'open' : ''}`} id="mn">
      <a href="#capitulos" onClick={onClose}>
        Sobre
      </a>
      <a href="#filmes" onClick={onClose}>
        Filmes
      </a>
      <a href="#novelas" onClick={onClose}>
        Novelas
      </a>
      <a href="#festival" onClick={onClose}>
        Festival
      </a>
      <a href="#equipe" onClick={onClose}>
        Equipe
      </a>
      <a href="#contato" onClick={onClose}>
        Contato
      </a>
    </div>
  )
}
