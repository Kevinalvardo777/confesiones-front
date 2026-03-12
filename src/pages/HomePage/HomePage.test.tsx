import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ConfessionsProvider } from '../../features/confessions/ConfessionsProvider/ConfessionsProvider'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('shows available sections', () => {
    render(
      <MemoryRouter>
        <ConfessionsProvider>
          <HomePage />
        </ConfessionsProvider>
      </MemoryRouter>,
    )

    expect(screen.getByText('Confesiones ESPOL')).toBeInTheDocument()
    expect(screen.getByText('Confesiones UCG')).toBeInTheDocument()
  })
})
