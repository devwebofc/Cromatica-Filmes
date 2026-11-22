import React from 'react'
import styles from '../styles.module.css'
import { Pill } from '../../../components/ui/Pill'

interface FestivalSectionProps {
  onPlay: (url: string) => void
}

export const FestivalSection: React.FC<FestivalSectionProps> = ({ onPlay }) => {
  return (
    <section className={styles.fs} id="festival">
      <div className="w">
        <h2>
          Sob as
          <br />
          estrelas
        </h2>
        <p className={styles.lide}>Festival Sob as Estrelas: quando a música se torna constelação.</p>
        <div className={styles.fg}>
          <div>
            <p>
              O Catiguá Tênis Club virou um céu vibrante, inspirado em Van Gogh. Foi uma noite em que cada ponto
              de luz carregava emoção, esperança e beleza. Música, arte e solidariedade formaram, juntas, uma grande
              constelação.
            </p>
            <p style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.6rem' }}>
              <Pill
                variant="sun"
                href="https://www.youtube.com/watch?v=I7I9N4Lfe6E"
                onClick={(e) => {
                  e.preventDefault()
                  onPlay('https://www.youtube.com/watch?v=I7I9N4Lfe6E')
                }}
              >
                Rever a noite no Catiguá ↗
              </Pill>
              <Pill
                style={{ background: '#fff2' }}
                href="https://www.youtube.com/watch?v=9efTdiIxKe4"
                onClick={(e) => {
                  e.preventDefault()
                  onPlay('https://www.youtube.com/watch?v=9efTdiIxKe4')
                }}
              >
                Momentos do festival ↗
              </Pill>
            </p>
          </div>
          <dl>
            <div>
              <dt>Exposição “Ecos de Van Gogh”</dt>
              <dd>Daianne Medeiros e Simone Oliveira</dd>
            </div>
            <div>
              <dt>Roteiro</dt>
              <dd>Ingrid Zavarezzi e Daianne Medeiros</dd>
            </div>
            <div>
              <dt>Produção artística</dt>
              <dd>Diego Silva</dd>
            </div>
            <div>
              <dt>Produção executiva</dt>
              <dd>Leidiane Anjos e Fabrício Medeiros</dd>
            </div>
          </dl>
        </div>
        <div className={styles.pr}>
          <b>Empresas parceiras</b>
          Cromática, Crossom, Hering Patrocínio, Dr. Gustavo Gerolim, FG Corretagens, Arte Final, Módulo FM, Prefeitura
          Municipal, Secretaria de Cultura, Luciana Santos Estética, Catiguá Tênis Club, Dr. Rayelle Pinheiro, Farmácia
          Nacional, Fernandes Pavimentação, Hego Empreendimentos, Padaria Globo, Lirius Biju, Anjju, Dr. Luiz Henrique
          Bernardes, Mc Cópias, Musical Magnific, Ouro Verde Cerrado, Simone Art Galery, Cantinho das Artes, Studio
          Angélica Fonseca, HJ Viver, Studio P3 e Restaurante Traíras.
        </div>
      </div>
    </section>
  )
}
