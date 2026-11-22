import React from 'react'
import styles from '../../pages/home/styles.module.css'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="w">
        <p className={styles.big} aria-hidden="true">
          Cromática
        </p>
        <div className={styles.fl}>
          <span>
            © <span id="y">{currentYear}</span> Cromática. Todos os direitos reservados.
          </span>
          <span>
            <a
              href="https://www.instagram.com/cromaticaescolademusica"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@cromaticaescolademusica8188"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              href="https://www.facebook.com/cromaticaescolademusicaptc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a href="politica-de-privacidade.html">Privacidade</a>
            <a href="https://www.getdevweb.com.br" target="_blank" rel="noopener noreferrer">
              Agência DevWeb
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
