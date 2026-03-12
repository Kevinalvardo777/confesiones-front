import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfessionComposer from './ConfessionComposer'

describe('ConfessionComposer', () => {
  it('submits alias and confession content', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(
      <ConfessionComposer
        section={{
          id: 'espol',
          name: 'Confesiones ESPOL',
          city: 'Guayaquil',
          headline: 'headline',
          description: 'description',
          accent: '#fff',
        }}
        onSubmit={handleSubmit}
      />,
    )

    await user.type(screen.getByPlaceholderText(/Fantasma/), 'Alias')
    await user.type(screen.getByPlaceholderText(/Que paso hoy/), 'Texto de prueba')
    await user.click(screen.getByRole('button', { name: 'Publicar confesion' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      authorAlias: 'Alias',
      content: 'Texto de prueba',
    })
  })
})
