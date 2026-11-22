import React from 'react'
import styles from '../styles.module.css'
import videoSrc from '../../../assets/video.mp4'

export const CoverSection: React.FC = () => {
  return (
    <section className={styles.cover} id="inicio">
      <div className="w">
        <h1 className={styles.wm} aria-label="Cromática">
          <span aria-hidden="true">
            CR<i></i>MÁTICA
          </span>
        </h1>
      </div>
      <div className={`w ${styles.cg}`}>
        <div className={styles.def}>
          <b>Cromática</b>
          <small>/kro·má·ti·ca/ substantivo feminino</small>
          <ol>
            <li>Relativo às cores.</li>
            <li>Escala musical formada por doze semitons.</li>
            <li>Escola de música e produtora de filmes de Patrocínio, Minas Gerais.</li>
          </ol>
        </div>
        <p className={styles.cgText}>
          Do primeiro acorde ao set de filmagem: uma escola de música e uma produtora de filmes
          que transformam vidas por meio da arte.
          <span>(Role para explorar)</span>
        </p>
        <div className={styles.gal}>
          <video autoPlay loop muted playsInline src={videoSrc} />
        </div>
      </div>
    </section>
  )
}
