import React from 'react'

interface HeaderProps {
  onToggleMenu: () => void
  menuOpen: boolean
}

export const Header: React.FC<HeaderProps> = ({ onToggleMenu, menuOpen }) => {
  return (
    <header>
      <a className="brand" href="#inicio">
        <svg viewBox="0 0 200 100" aria-hidden="true">
          <path d="M0 100A100 100 0 0 1 200 100Z" fill="#fff" />
        </svg>
        Cromática
      </a>
      <nav>
        <a href="#capitulos">Sobre</a>
        <a href="#filmes">Filmes</a>
        <a href="#novelas">Novelas</a>
        <a href="#festival">Festival</a>
        <a href="#equipe">Equipe</a>
        <a href="#contato">Contato</a>
      </nav>
      <button
        className="menu"
        id="mb"
        type="button"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        {menuOpen ? 'Fechar' : 'Menu'}
      </button>
    </header>
  )
}
