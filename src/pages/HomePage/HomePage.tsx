import SectionCard from '../../components/SectionCard/SectionCard'
import { sections } from '../../data/sections'
import { useConfessions } from '../../features/confessions/ConfessionsProvider/useConfessions'
import './HomePage.scss'

function HomePage() {
  const { confessions } = useConfessions()

  return (
    <div className="home-page">
      <section className="home-page__intro">
        <div>
          <span>Mapa de secciones</span>
          <h2>Elige tu campus y entra al feed de confesiones.</h2>
        </div>
        <p>
          Cada comunidad tiene su propia página, su propio filtro por fecha y sus propias historias. El ranking toma
          las mejor valoradas de todas.
        </p>
      </section>

      <section className="home-page__sections">
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            totalConfessions={confessions.filter((confession) => confession.sectionId === section.id).length}
          />
        ))}
      </section>
    </div>
  )
}

export default HomePage
