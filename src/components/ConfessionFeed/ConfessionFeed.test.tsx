import { render, screen } from '@testing-library/react'
import ConfessionFeed from './ConfessionFeed'

describe('ConfessionFeed', () => {
  it('renders empty state when there are no confessions', () => {
    render(<ConfessionFeed confessions={[]} sectionNameById={{}} onRate={vi.fn()} emptyMessage="Vacio" />)

    expect(screen.getByText('Vacio')).toBeInTheDocument()
  })
})
