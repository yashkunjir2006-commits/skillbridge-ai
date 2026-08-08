import { useState } from 'react'
import { Moon, Bell, User, Shield, Lock } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import './Settings.css'

function Toggle({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle__thumb" />
    </button>
  )
}

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
  })

  return (
    <div>
      <PageHeader eyebrow="More" title="Settings" description="Manage your profile, notifications, and account." />

      <div className="fp-stack">
        <Card>
          <div className="settings-section-header">
            <User size={16} strokeWidth={1.8} />
            <h3>Account</h3>
          </div>
          <div className="fp-field">
            <label>Full name</label>
            <input defaultValue="Yash" />
          </div>
          <div className="fp-field">
            <label>Target role</label>
            <input defaultValue="AI/ML Engineer" />
          </div>
          <Button variant="secondary">Save Changes</Button>
        </Card>

        <Card>
          <div className="settings-section-header">
            <Moon size={16} strokeWidth={1.8} />
            <h3>Appearance</h3>
          </div>
          <div className="settings-row">
            <div>
              <p className="settings-row__title">Dark mode</p>
              <p className="settings-row__desc">Dark mode is ready to enable when you want it.</p>
            </div>
            <Toggle checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
          </div>
        </Card>

        <Card>
          <div className="settings-section-header">
            <Bell size={16} strokeWidth={1.8} />
            <h3>Notifications</h3>
          </div>
          {[
            ['email', 'Email notifications'],
            ['push', 'Push notifications'],
            ['weeklyDigest', 'Weekly progress digest'],
          ].map(([key, label]) => (
            <div className="settings-row" key={key}>
              <p className="settings-row__title">{label}</p>
              <Toggle
                checked={notifs[key]}
                onChange={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))}
              />
            </div>
          ))}
        </Card>

        <Card>
          <div className="settings-section-header">
            <Shield size={16} strokeWidth={1.8} />
            <h3>Security</h3>
          </div>
          <div className="settings-row">
            <p className="settings-row__title">Password</p>
            <Button variant="secondary" size="sm">
              Change Password
            </Button>
          </div>
          <div className="settings-row">
            <p className="settings-row__title">Two-factor authentication</p>
            <Button variant="secondary" size="sm">
              Enable
            </Button>
          </div>
        </Card>

        <Card>
          <div className="settings-section-header">
            <Lock size={16} strokeWidth={1.8} />
            <h3>Privacy</h3>
          </div>
          <div className="settings-row">
            <p className="settings-row__title">Data export</p>
            <Button variant="secondary" size="sm">
              Request Export
            </Button>
          </div>
          <div className="settings-row">
            <p className="settings-row__title">Delete account</p>
            <Button variant="secondary" size="sm">
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
