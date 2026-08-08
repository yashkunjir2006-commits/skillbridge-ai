import { motion } from 'motion/react'
import { Plus, LayoutGrid } from 'lucide-react'
import { navbarSlideDown } from '../../animations/variants'
import './Navbar.css'

function Logo() {
  return (
    <svg
      className="navbar__logo-mark"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

export default function Navbar() {
  return (
    <motion.header
      className="navbar"
      variants={navbarSlideDown}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar__inner">
        <div className="navbar__left">
          <div className="navbar__brand">
            <Logo />
            <span className="navbar__brand-name">SkillBridge AI</span>
          </div>

          <div className="navbar__menu-pill">
            <span className="navbar__menu-circle">
              <Plus size={13} strokeWidth={2.5} />
            </span>
            <span className="navbar__menu-text">Menu</span>
          </div>

          <div className="navbar__tags">
            <span className="navbar__tag">AI Resume</span>
            <span className="navbar__tag">Career Coach</span>
          </div>
        </div>

        <div className="navbar__right">
          <div className="navbar__status-pill">
            <span className="navbar__status-circle">
              <LayoutGrid size={12} strokeWidth={2.5} />
            </span>
            <span className="navbar__status-text">Career Platform</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
