import React from 'react'
import styles from '../styles.module.css'

export const StepsSection: React.FC = () => {
  return (
    <section className={styles.ps}>
      <div className="w">
        <h2>Seu primeiro passo</h2>
        <div className={styles.pg3}>
          <div>
            <div className={styles.ord}>1</div>
            <h3>Fale com a gente</h3>
            <p>Chame no WhatsApp, ligue ou escreva. Conte se você quer aprender música ou fazer um filme.</p>
          </div>
          <div>
            <div className={styles.ord}>2</div>
            <h3>Venha conhecer</h3>
            <p>Visite a escola na Av. João Alves do Nascimento, 1746, Centro, Patrocínio (MG).</p>
          </div>
          <div>
            <div className={styles.ord}>3</div>
            <h3>Escolha seu caminho</h3>
            <p>Aulas pensadas para o seu ritmo e o seu objetivo, ou um projeto audiovisual do roteiro à tela.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
