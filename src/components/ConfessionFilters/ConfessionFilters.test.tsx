import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfessionFilters from './ConfessionFilters'

describe('ConfessionFilters', () => {
  it('updates selected date', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<ConfessionFilters selectedDate="" onDateChange={handleChange} totalVisible={2} />)

    await user.type(screen.getByLabelText('Fecha'), '2026-03-11')

    expect(handleChange).toHaveBeenCalled()
    expect(screen.getByText('2 resultados visibles')).toBeInTheDocument()
  })
})
