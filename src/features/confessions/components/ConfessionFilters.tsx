import FormField from '@/components/molecules/FormField/FormField'
import Button from '@/shared/components/ui/Button'
import './confessions.scss'

interface ConfessionFiltersProps {
  selectedDate: string
  sort: 'recent' | 'top'
  totalVisible: number
  onDateChange: (value: string) => void
  onSortChange: (value: 'recent' | 'top') => void
}

function ConfessionFilters({ selectedDate, sort, totalVisible, onDateChange, onSortChange }: ConfessionFiltersProps) {
  return (
    <section className="confession-filters surface-panel">
      <div className="confession-filters__intro">
        <span className="page-header__eyebrow">Explorar feed</span>
        <h3>Filtra por fecha y cambia el orden del listado.</h3>
      </div>

      <div className="confession-filters__controls">
        <FormField id="confession-date" label="Fecha">
          <input
            className="confession-filters__control"
            id="confession-date"
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </FormField>

        <FormField id="confession-sort" label="Orden">
          <select
            className="confession-filters__control"
            id="confession-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as 'recent' | 'top')}
          >
            <option value="recent">Mas recientes</option>
            <option value="top">Mejor valoradas</option>
          </select>
        </FormField>

        <Button type="button" variant="ghost" onClick={() => onDateChange('')}>
          Limpiar
        </Button>
      </div>

      <strong className="confession-filters__count">{totalVisible} visibles</strong>
    </section>
  )
}

export default ConfessionFilters
