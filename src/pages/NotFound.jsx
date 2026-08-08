import { useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '../components/common/Button'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <span className="not-found__icon">
        <Compass size={22} strokeWidth={1.6} />
      </span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    </div>
  )
}
