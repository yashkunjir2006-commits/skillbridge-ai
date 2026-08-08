import './PageHeader.css'

export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="page-header">
      <div className="page-header__text">
        {eyebrow && <span className="page-header__eyebrow">{eyebrow}</span>}
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  )
}
