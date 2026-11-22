import React from 'react'
import styles from '../styles.module.css'
import { TeamMember } from '../../../components/ui/Drawer'
import daianneImg from '../../../assets/daianne.jpg'
import diegoImg from '../../../assets/diego.jpg'
import leidianeImg from '../../../assets/leidiane.jpg'
import fabricioImg from '../../../assets/fabricio.jpg'

interface TeamSectionProps {
  onSelectMember: (member: TeamMember) => void
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Daianne Medeiros',
    role: 'CEO e diretora executiva',
    photo: daianneImg,
    quote: 'A música é a linguagem universal que conecta corações e mentes.',
  },
  {
    name: 'Diego Silva',
    role: 'Produtor musical e professor',
    photo: diegoImg,
    quote: 'Cada nota musical é uma oportunidade de transformação e aprendizado.',
  },
  {
    name: 'Leidiane Cortes',
    role: 'Gerente geral e produtora executiva',
    photo: leidianeImg,
    quote: 'A organização e a criatividade andam juntas para alcançarmos a excelência.',
  },
  {
    name: 'Fabrício Medeiros',
    role: 'Diretor e assessor financeiro',
    photo: fabricioImg,
    quote: 'A sustentabilidade financeira é o alicerce para projetos criativos de sucesso.',
  },
]

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectMember }) => {
  return (
    <section className={styles.eq} id="equipe">
      <div className="w">
        <div className={styles.hd}>
          <h2>Quem faz</h2>
          <p>(Clique em cada pessoa)</p>
        </div>
        <ul>
          {TEAM_MEMBERS.map((m) => (
            <li key={m.name}>
              <button
                className={styles.pb}
                type="button"
                onClick={() => onSelectMember(m)}
              >
                {m.name} <small>{m.role}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
