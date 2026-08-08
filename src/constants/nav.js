import {
  LayoutGrid,
  FileText,
  ScanSearch,
  Compass,
  BookOpen,
  Map,
  Mic,
  ListChecks,
  Briefcase,
  GraduationCap,
  Gauge,
  MessageSquare,
  LayoutTemplate,
  Award,
  FolderKanban,
  Bookmark,
  Users,
  Settings,
} from 'lucide-react'

export const BRAND_NAME = 'SkillBridge AI'

export const SIDEBAR_SECTIONS = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: LayoutGrid }],
  },
  {
    label: 'Career Tools',
    items: [
      { label: 'Resume', to: '/resume', icon: FileText },
      { label: 'ATS Analysis', to: '/ats', icon: ScanSearch },
      { label: 'AI Career Coach', to: '/coach', icon: Compass },
      { label: 'Career Roadmap', to: '/roadmap', icon: Map },
      { label: 'Skill Analyzer', to: '/skills', icon: Gauge },
    ],
  },
  {
    label: 'Practice',
    items: [
      { label: 'Mock Interview', to: '/mock-interview', icon: Mic },
      { label: 'Mock Tests', to: '/mock-tests', icon: ListChecks },
      { label: 'Learning Hub', to: '/learning', icon: BookOpen },
    ],
  },
  {
    label: 'Opportunities',
    items: [
      { label: 'Jobs', to: '/jobs', icon: Briefcase },
      { label: 'Internships', to: '/internships', icon: GraduationCap },
    ],
  },
  {
    label: 'Build',
    items: [
      { label: 'AI Chat', to: '/chat', icon: MessageSquare },
      { label: 'Portfolio Builder', to: '/portfolio', icon: LayoutTemplate },
      { label: 'Certificates', to: '/certificates', icon: Award },
      { label: 'Projects', to: '/projects', icon: FolderKanban },
    ],
  },
  {
    label: 'More',
    items: [
      { label: 'Bookmarks', to: '/bookmarks', icon: Bookmark },
      { label: 'Community', to: '/community', icon: Users },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
]

export const SIDEBAR_ITEMS_FLAT = SIDEBAR_SECTIONS.flatMap((s) => s.items)
