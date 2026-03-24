import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main hero and navigation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /Historias anonimas/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Ranking' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Inicio' }).length).toBeGreaterThan(0)
  })
})
