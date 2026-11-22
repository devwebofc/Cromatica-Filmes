import React, { useState } from 'react'
import styles from '../styles.module.css'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    int: '',
    msg: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Olá! Sou ${formData.nome}. Tenho interesse em: ${formData.int}.${
      formData.msg ? ' ' + formData.msg : ''
    }`
    const url = `https://wa.me/553430992622?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener')
  }

  return (
    <section className={styles.ct} id="contato">
      <div className="w">
        <h2>Vamos contar a sua história?</h2>
        <div className={styles.cf}>
          <div>
            <p>Conte o que você tem em mente. A resposta chega pelo WhatsApp.</p>
            <ul>
              <li>Av. João Alves do Nascimento, 1746, Centro, Patrocínio (MG)</li>
              <li>
                <a href="tel:+553430992622">(34) 3099-2622</a>
              </li>
              <li>
                <a href="mailto:cromaticaescolademusica@gmail.com">cromaticaescolademusica@gmail.com</a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Jo%C3%A3o+Alves+do+Nascimento+1746+Patroc%C3%ADnio+MG"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no Google Maps
                </a>
              </li>
            </ul>
          </div>
          <form id="f" onSubmit={handleSubmit}>
            <input
              name="nome"
              placeholder="Seu nome"
              aria-label="Seu nome"
              required
              autoComplete="name"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <select
              name="int"
              aria-label="Interesse"
              required
              value={formData.int}
              onChange={(e) => setFormData({ ...formData, int: e.target.value })}
            >
              <option value="">Qual é o seu interesse?</option>
              <option value="Aulas de música">Aulas de música</option>
              <option value="Filmes">Filmes</option>
              <option value="Outro assunto">Outro assunto</option>
            </select>
            <textarea
              name="msg"
              placeholder="Conte um pouco do que você precisa"
              aria-label="Mensagem"
              value={formData.msg}
              onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
            />
            <button className="pill" type="submit">
              Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
