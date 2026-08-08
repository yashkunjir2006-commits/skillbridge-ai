import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import NotFound from './pages/NotFound'
import { PUBLIC_ROUTES, DASHBOARD_ROUTES } from './routes/routes.jsx'

export default function App() {
  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, element: Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}

      <Route element={<DashboardLayout />}>
        {DASHBOARD_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
