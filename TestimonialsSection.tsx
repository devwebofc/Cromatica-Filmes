import React from 'react'
import styles from '../styles.module.css'
import t1Img from '../../../assets/t1.jpg'
import t2Img from '../../../assets/t2.jpg'
import t3Img from '../../../assets/t3.jpg'

export const TestimonialsSection: React.FC = () => {
  return (
    <section className={styles.dp}>
      <div className="w">
        <h2>Quem passou por aqui</h2>
        <div className={styles.dg}>
          <blockquote>
            <p>
              “A Cromática mudou minha vida! Aprendi muito mais do que técnicas musicais, aprendi a me expressar
              através da arte.”
            </p>
            <footer>
              <img src={t1Img} alt="Ana Clara" />
              Ana Clara, aluna de canto
            </footer>
          </blockquote>
          <blockquote>
            <p>
              “Incrível como a equipe transforma a teoria em algo tão prático e divertido. Recomendo muito!”
            </p>
            <footer>
              <img src={t2Img} alt="Rafael Mendes" />
              Rafael Mendes, aluno de produção musical
            </footer>
          </blockquote>
          <blockquote>
            <p>
              “Meu filho desenvolveu habilidades incríveis desde que começou nas aulas de música. A equipe é maravilhosa!”
            </p>
            <footer>
              <img src={t3Img} alt="Patrícia Oliveira" />
              Patrícia Oliveira, mãe de aluno
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
