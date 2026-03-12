import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SectionCard from './SectionCard'

describe('SectionCard', () => {
  it('renders section details', () => {
    render(
      <MemoryRouter>
        <SectionCard
          section={{
            id: 'espol',
            name: 'Confesiones ESPOL',
            city: 'Guayaquil',
            headline: 'Titular',
            description: 'Descripcion',
            accent: '#fff',
          }}
          totalConfessions={3}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Confesiones ESPOL')).toBeInTheDocument()
    expect(screen.getByText('3 confesiones')).toBeInTheDocument()
  })
})
