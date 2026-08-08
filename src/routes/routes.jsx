import Landing from '../pages/Landing'
import DashboardHome from '../pages/dashboard/DashboardHome'
import ResumeBuilder from '../pages/ResumeBuilder'
import ATSScore from '../pages/ATSScore'
import AICareerCoach from '../pages/AICareerCoach'
import CareerRoadmap from '../pages/CareerRoadmap'
import SkillAnalyzer from '../pages/SkillAnalyzer'
import MockInterview from '../pages/MockInterview'
import MockTests from '../pages/MockTests'
import LearningHub from '../pages/LearningHub'
import Jobs from '../pages/Jobs'
import Internships from '../pages/Internships'
import AIChat from '../pages/AIChat'
import PortfolioBuilder from '../pages/PortfolioBuilder'
import CertificationTracker from '../pages/CertificationTracker'
import ProjectBuilder from '../pages/ProjectBuilder'
import Bookmarks from '../pages/Bookmarks'
import Community from '../pages/Community'
import Settings from '../pages/Settings'

// Landing is rendered outside the dashboard layout.
export const PUBLIC_ROUTES = [{ path: '/', element: Landing }]

// All dashboard routes are rendered inside DashboardLayout (sidebar + topbar).
export const DASHBOARD_ROUTES = [
  { path: '/dashboard', element: DashboardHome },
  { path: '/resume', element: ResumeBuilder },
  { path: '/ats', element: ATSScore },
  { path: '/coach', element: AICareerCoach },
  { path: '/roadmap', element: CareerRoadmap },
  { path: '/skills', element: SkillAnalyzer },
  { path: '/mock-interview', element: MockInterview },
  { path: '/mock-tests', element: MockTests },
  { path: '/learning', element: LearningHub },
  { path: '/jobs', element: Jobs },
  { path: '/internships', element: Internships },
  { path: '/chat', element: AIChat },
  { path: '/portfolio', element: PortfolioBuilder },
  { path: '/certificates', element: CertificationTracker },
  { path: '/projects', element: ProjectBuilder },
  { path: '/bookmarks', element: Bookmarks },
  { path: '/community', element: Community },
  { path: '/settings', element: Settings },
]
