import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size}`}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 16} strokeWidth={2.25} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 16} strokeWidth={2.25} />}
    </button>
  )
}
