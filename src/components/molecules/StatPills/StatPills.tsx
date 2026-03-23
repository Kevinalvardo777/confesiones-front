import Badge from '@/components/atoms/Badge/Badge'
import './StatPills.scss'

interface StatPillItem {
  label: string
  accent?: boolean
}

interface StatPillsProps {
  items: StatPillItem[]
}

function StatPills({ items }: StatPillsProps) {
  return (
    <div className="molecule-stat-pills">
      {items.map((item) => (
        <Badge key={item.label} accent={item.accent}>
          {item.label}
        </Badge>
      ))}
    </div>
  )
}

export default StatPills
