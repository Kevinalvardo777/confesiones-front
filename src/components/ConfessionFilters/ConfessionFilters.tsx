import './ConfessionFilters.scss'

interface ConfessionFiltersProps {
  selectedDate: string
  onDateChange: (value: string) => void
  totalVisible: number
}

function ConfessionFilters({ selectedDate, onDateChange, totalVisible }: ConfessionFiltersProps) {
  return (
    <section className="confession-filters">
      <div>
        <span>Filtrar por fecha</span>
        <h3>Encuentra una confesion por dia exacto.</h3>
      </div>

      <div className="confession-filters__controls">
        <label>
          Fecha
          <input type="date" value={selectedDate} onChange={(event) => onDateChange(event.target.value)} />
        </label>
        <button type="button" onClick={() => onDateChange('')}>
          Limpiar filtro
        </button>
      </div>

      <strong>{totalVisible} resultados visibles</strong>
    </section>
  )
}

export default ConfessionFilters
