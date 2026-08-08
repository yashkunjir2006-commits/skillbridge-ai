import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { SIDEBAR_SECTIONS } from '../../constants/nav'
import './Sidebar.css'

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#000000" />
      <path
        d="M9 20L16 9L23 20"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="23" r="1.6" fill="#ffffff" />
    </svg>
  )
}

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="sidebar__scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <Logo />
            <span className="sidebar__brand-name">SkillBridge AI</span>
          </div>
          <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {SIDEBAR_SECTIONS.map((section) => (
            <div className="sidebar__section" key={section.label}>
              <span className="sidebar__section-label">{section.label}</span>
              <ul className="sidebar__list">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                        }
                        onClick={onClose}
                      >
                        <Icon size={17} strokeWidth={1.9} />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <span className="sidebar__avatar">Y</span>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Yash</span>
              <span className="sidebar__user-role">Student · AI/ML</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
