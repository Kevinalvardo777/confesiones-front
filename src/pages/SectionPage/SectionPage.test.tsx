import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ConfessionsProvider } from '../../features/confessions/ConfessionsProvider/ConfessionsProvider'
import SectionPage from './SectionPage'

describe('SectionPage', () => {
  it('filters by date and lets users publish in a section', async () => {
    const user = userEvent.setup()

    render(
      <ConfessionsProvider
        initialState={[
          {
            id: '1',
            sectionId: 'espol',
            authorAlias: 'Anon',
            content: 'Confesion antigua',
            createdAt: '2026-03-09T12:00:00.000Z',
            ratingTotal: 0,
            ratingVotes: 0,
          },
        ]}
      >
        <MemoryRouter initialEntries={['/seccion/espol']}>
          <Routes>
            <Route path="/seccion/:sectionId" element={<SectionPage />} />
          </Routes>
        </MemoryRouter>
      </ConfessionsProvider>,
    )

    await user.type(screen.getByLabelText('Fecha'), '2026-03-10')
    expect(screen.getByText(/No hay confesiones/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Limpiar filtro' }))
    await user.type(screen.getByPlaceholderText(/Fantasma/), 'Nuevo alias')
    await user.type(screen.getByPlaceholderText(/Que paso hoy/), 'Nueva confesion')
    await user.click(screen.getByRole('button', { name: 'Publicar confesion' }))

    expect(screen.getByText('Nueva confesion')).toBeInTheDocument()
  })
})
