import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfessionCard from './ConfessionCard'

describe('ConfessionCard', () => {
  it('allows rating a confession with stars', async () => {
    const user = userEvent.setup()
    const handleRate = vi.fn()

    render(
      <ConfessionCard
        confession={{
          id: '1',
          sectionId: 'espol',
          authorAlias: 'Anon',
          content: 'Texto',
          createdAt: '2026-03-11T12:00:00.000Z',
          ratingTotal: 10,
          ratingVotes: 2,
        }}
        sectionName="Confesiones ESPOL"
        onRate={handleRate}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Dar 5 estrellas' }))

    expect(handleRate).toHaveBeenCalledWith('1', 5)
    expect(screen.getByText('5.0 / 5')).toBeInTheDocument()
  })
})
