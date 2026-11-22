import React from 'react'
import styles from '../styles.module.css'

export const FaqSection: React.FC = () => {
  return (
    <section className={styles.fq}>
      <div className="w">
        <h2>Perguntas</h2>
        <details>
          <summary>Quem pode estudar na Cromática?</summary>
          <p>Alunos de todas as idades.</p>
        </details>
        <details>
          <summary>Como são as aulas?</summary>
          <p>Os cursos se adaptam ao ritmo e ao objetivo de cada aluno, com professores qualificados.</p>
        </details>
        <details>
          <summary>Onde fica a escola?</summary>
          <p>Na Av. João Alves do Nascimento, 1746, Centro, Patrocínio (MG).</p>
        </details>
        <details>
          <summary>Como falo com a Cromática?</summary>
          <p>
            Pelo telefone (34) 3099-2622, pelo WhatsApp ou pelo e-mail cromaticaescolademusica@gmail.com. Você também pode
            usar o formulário desta página.
          </p>
        </details>
        <details>
          <summary>Onde vejo os trabalhos?</summary>
          <p>Na seção de filmes desta página e no canal da Cromática no YouTube.</p>
        </details>
      </div>
    </section>
  )
}
