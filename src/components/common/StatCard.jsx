import { TrendingUp, TrendingDown } from 'lucide-react'
import Card from './Card'
import './StatCard.css'

export default function StatCard({ icon: Icon, label, value, delta, deltaTone = 'success' }) {
  const TrendIcon = deltaTone === 'success' ? TrendingUp : TrendingDown
  return (
    <Card className="stat-card" hover>
      <div className="stat-card__top">
        {Icon && (
          <span className="stat-card__icon">
            <Icon size={16} strokeWidth={1.9} />
          </span>
        )}
        {delta && (
          <span className={`stat-card__delta stat-card__delta--${deltaTone}`}>
            <TrendIcon size={12} strokeWidth={2.25} />
            {delta}
          </span>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </Card>
  )
}
