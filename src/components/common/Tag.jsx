import './Tag.css'

const TONES = ['neutral', 'success', 'warning', 'danger', 'info', 'dark']

export default function Tag({ children, tone = 'neutral', icon: Icon }) {
  const safeTone = TONES.includes(tone) ? tone : 'neutral'
  return (
    <span className={`tag tag--${safeTone}`}>
      {Icon && <Icon size={12} strokeWidth={2.25} />}
      {children}
    </span>
  )
}
