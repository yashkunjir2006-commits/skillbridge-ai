import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, Bell, ChevronDown } from 'lucide-react'
import './TopNavbar.css'

export default function TopNavbar({ onMenuClick }) {
  const [query, setQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate('/dashboard')
    }
  }

  return (
    <header className="topbar">
      <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={19} />
      </button>

      <form className="topbar__search" onSubmit={handleSearchSubmit}>
        <Search size={15} strokeWidth={2} className="topbar__search-icon" />
        <input
          type="text"
          placeholder="Search resume, roadmaps, jobs, courses, skills, interviews…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="topbar__search-kbd">⌘K</span>
      </form>

      <div className="topbar__actions">
        <div className="topbar__notif-wrap">
          <button
            className="topbar__icon-btn"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
          >
            <Bell size={17} strokeWidth={1.9} />
            <span className="topbar__notif-dot" />
          </button>
          {notifOpen && (
            <div className="topbar__notif-panel">
              <div className="topbar__notif-title">Notifications</div>
              <div className="topbar__notif-item">
                <span className="topbar__notif-bullet" />
                <div>
                  <p>Your ATS score improved to 82%</p>
                  <span>2h ago</span>
                </div>
              </div>
              <div className="topbar__notif-item">
                <span className="topbar__notif-bullet" />
                <div>
                  <p>New roadmap milestone unlocked</p>
                  <span>Yesterday</span>
                </div>
              </div>
              <div className="topbar__notif-item">
                <span className="topbar__notif-bullet" />
                <div>
                  <p>Mock interview feedback is ready</p>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="topbar__profile" onClick={() => navigate('/settings')}>
          <span className="topbar__avatar">Y</span>
          <span className="topbar__profile-name">Yash</span>
          <ChevronDown size={14} strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}
