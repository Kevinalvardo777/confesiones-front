import { useState, type FormEvent } from 'react'
import type { Section } from '../../types/confession'
import './ConfessionComposer.scss'

interface ConfessionComposerProps {
  section: Section
  onSubmit: (payload: { authorAlias: string; content: string }) => void
}

function ConfessionComposer({ section, onSubmit }: ConfessionComposerProps) {
  const [authorAlias, setAuthorAlias] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedContent = content.trim()
    if (!trimmedContent) {
      return
    }

    onSubmit({
      authorAlias: authorAlias.trim() || 'Anonimo',
      content: trimmedContent,
    })

    setAuthorAlias('')
    setContent('')
  }

  return (
    <section className="confession-composer">
      <div className="confession-composer__copy">
        <span>Publicar en {section.name}</span>
        <h2>Sueltalo sin firma.</h2>
        <p>Tu confesión aparecerá en la sección elegida y podrá recibir estrellas del resto.</p>
      </div>

      <form className="confession-composer__form" onSubmit={handleSubmit}>
        <label>
          Alias
          <input
            type="text"
            placeholder="Ej. Fantasma del bloque A"
            value={authorAlias}
            onChange={(event) => setAuthorAlias(event.target.value)}
          />
        </label>

        <label>
          Confesion
          <textarea
            rows={5}
            placeholder={`Que paso hoy en ${section.name}?`}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>

        <button type="submit">Publicar confesion</button>
      </form>
    </section>
  )
}

export default ConfessionComposer
