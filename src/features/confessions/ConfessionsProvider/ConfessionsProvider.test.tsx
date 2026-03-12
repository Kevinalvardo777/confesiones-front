import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfessionsProvider } from './ConfessionsProvider'
import { useConfessions } from './useConfessions'

function Consumer() {
  const { confessions, addConfession, rateConfession } = useConfessions()
  const seed = confessions.find((confession) => confession.id === 'seed')

  return (
    <div>
      <span data-testid="seed-votes">{seed?.ratingVotes ?? 0}</span>
      <button onClick={() => addConfession({ sectionId: 'espol', authorAlias: 'Test', content: 'Nueva' })}>agregar</button>
      <button onClick={() => rateConfession('seed', 5)}>rate</button>
      <p>{confessions.map((confession) => confession.content).join(', ')}</p>
    </div>
  )
}

describe('ConfessionsProvider', () => {
  it('adds and rates confessions through context', async () => {
    const user = userEvent.setup()

    render(
      <ConfessionsProvider
        initialState={[
          {
            id: 'seed',
            sectionId: 'espol',
            authorAlias: 'Anon',
            content: 'Base',
            createdAt: '2026-03-10T12:00:00.000Z',
            ratingTotal: 0,
            ratingVotes: 0,
          },
        ]}
      >
        <Consumer />
      </ConfessionsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'rate' }))
    await user.click(screen.getByRole('button', { name: 'agregar' }))

    expect(screen.getByTestId('seed-votes')).toHaveTextContent('1')
    expect(screen.getByText(/Nueva/)).toBeInTheDocument()
  })
})
