export default function Skeleton({ width = '100%', height = 14, radius = 6, style }) {
  return (
    <div
      className="skel"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}
