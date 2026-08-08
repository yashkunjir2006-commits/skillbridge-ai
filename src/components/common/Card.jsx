import './Card.css'

export default function Card({ children, className = '', padded = true, hover = false, ...rest }) {
  return (
    <div
      className={`card ${padded ? 'card--padded' : ''} ${hover ? 'card--hover' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
