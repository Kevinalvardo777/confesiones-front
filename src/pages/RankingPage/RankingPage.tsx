import ConfessionFeed from '../../components/ConfessionFeed/ConfessionFeed'
import { sections } from '../../data/sections'
import { useConfessions } from '../../features/confessions/ConfessionsProvider/useConfessions'
import './RankingPage.scss'

function RankingPage() {
  const { confessions, rateConfession } = useConfessions()

  const sectionNameById = Object.fromEntries(sections.map((section) => [section.id, section.name]))
  const topConfessions = [...confessions]
    .sort((left, right) => {
      const leftAverage = left.ratingVotes ? left.ratingTotal / left.ratingVotes : 0
      const rightAverage = right.ratingVotes ? right.ratingTotal / right.ratingVotes : 0

      if (rightAverage !== leftAverage) {
        return rightAverage - leftAverage
      }

      return right.ratingVotes - left.ratingVotes
    })
    .slice(0, 6)

  return (
    <div className="ranking-page">
      <section className="ranking-page__hero">
        <span>Top confesiones</span>
        <h2>Las historias mejor puntuadas por la comunidad.</h2>
        <p>El ranking mezcla todas las universidades y destaca las confesiones con promedio más alto.</p>
      </section>

      <ConfessionFeed
        confessions={topConfessions}
        sectionNameById={sectionNameById}
        onRate={rateConfession}
        emptyMessage="Todavia no hay confesiones puntuadas."
      />
    </div>
  )
}

export default RankingPage
