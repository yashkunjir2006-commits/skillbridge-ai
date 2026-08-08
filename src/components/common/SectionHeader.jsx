import './SectionHeader.css'

export default function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {action && <div className="section-header__action">{action}</div>}
    </div>
  )
}
