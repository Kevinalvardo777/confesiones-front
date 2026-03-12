import { render, screen } from '@testing-library/react'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('renders project summary', () => {
    render(<AboutPage />)

    expect(screen.getByText(/tablero de confesiones/)).toBeInTheDocument()
  })
})
