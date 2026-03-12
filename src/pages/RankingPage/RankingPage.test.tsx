import { render, screen } from '@testing-library/react'
import { ConfessionsProvider } from '../../features/confessions/ConfessionsProvider/ConfessionsProvider'
import RankingPage from './RankingPage'

describe('RankingPage', () => {
  it('renders the top confessions heading', () => {
    render(
      <ConfessionsProvider>
        <RankingPage />
      </ConfessionsProvider>,
    )

    expect(screen.getByText(/Las historias mejor puntuadas/)).toBeInTheDocument()
  })
})
