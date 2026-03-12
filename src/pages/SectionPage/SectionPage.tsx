import { useState, type CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
import ConfessionComposer from '../../components/ConfessionComposer/ConfessionComposer'
import ConfessionFeed from '../../components/ConfessionFeed/ConfessionFeed'
import ConfessionFilters from '../../components/ConfessionFilters/ConfessionFilters'
import { sections } from '../../data/sections'
import { useConfessions } from '../../features/confessions/ConfessionsProvider/useConfessions'
import './SectionPage.scss'

function toDateInputValue(date: string) {
  return new Date(date).toISOString().slice(0, 10)
}

function SectionPage() {
  const { sectionId = '' } = useParams()
  const { confessions, addConfession, rateConfession } = useConfessions()
  const [selectedDate, setSelectedDate] = useState('')

  const section = sections.find((item) => item.id === sectionId)

  if (!section) {
    return (
      <section className="section-page__not-found">
        <h2>Seccion no encontrada</h2>
        <p>La ruta no coincide con una comunidad configurada.</p>
      </section>
    )
  }

  const filteredConfessions = confessions
    .filter((confession) => confession.sectionId === section.id)
    .filter((confession) => !selectedDate || toDateInputValue(confession.createdAt) === selectedDate)
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))

  return (
    <div className="section-page">
      <section className="section-page__header" style={{ '--section-accent': section.accent } as CSSProperties}>
        <div>
          <span>{section.city}</span>
          <h2>{section.name}</h2>
        </div>
        <p>{section.description}</p>
      </section>

      <ConfessionComposer
        section={section}
        onSubmit={({ authorAlias, content }) => addConfession({ sectionId: section.id, authorAlias, content })}
      />

      <ConfessionFilters
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        totalVisible={filteredConfessions.length}
      />

      <ConfessionFeed
        confessions={filteredConfessions}
        sectionNameById={{ [section.id]: section.name }}
        onRate={rateConfession}
        emptyMessage="No hay confesiones para esa fecha en esta seccion."
      />
    </div>
  )
}

export default SectionPage
