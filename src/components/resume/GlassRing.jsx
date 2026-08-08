export default function GlassRing({ value = 0, size = 84 }) {
  return (
    <div
      className="glass-ring"
      style={{ '--ring-size': `${size}px`, '--ring-pct': Math.max(0, Math.min(100, value)) }}
    >
      <span className="glass-ring__value">{value}</span>
    </div>
  )
}
