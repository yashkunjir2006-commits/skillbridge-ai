import './ProgressBar.css'

export default function ProgressBar({ value = 0, label, tone = 'dark' }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="progress">
      {label && (
        <div className="progress__label-row">
          <span className="progress__label">{label}</span>
          <span className="progress__value">{clamped}%</span>
        </div>
      )}
      <div className="progress__track">
        <div
          className={`progress__fill progress__fill--${tone}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
