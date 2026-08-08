import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import TopNavbar from '../components/dashboard/TopNavbar'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dash-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="dash-layout__main">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="dash-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
