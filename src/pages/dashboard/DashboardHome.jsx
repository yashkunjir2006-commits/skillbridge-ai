import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  FileText,
  GraduationCap,
  Mic,
  Map,
  Gauge,
  Briefcase,
  BookOpen,
  Clock,
} from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import SectionHeader from '../../components/common/SectionHeader'
import ProgressBar from '../../components/common/ProgressBar'
import Tag from '../../components/common/Tag'
import {
  STATS,
  RECENT_ACTIVITY,
  RECOMMENDED_JOBS,
  UPCOMING_INTERVIEWS,
  SAVED_LEARNING,
  SUGGESTION_CARDS,
} from '../../data/mockData'
import './DashboardHome.css'

const SUGGESTION_ICONS = {
  'improve-resume': FileText,
  'find-internship': GraduationCap,
  'practice-interview': Mic,
  'generate-roadmap': Map,
  'analyze-skills': Gauge,
}

export default function DashboardHome() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate('/chat', { state: { prompt: query } })
  }

  return (
    <div className="dash-home">
      <div className="dash-home__greeting">
        <span className="dash-home__eyebrow">Good Evening, Yash</span>
        <h1 className="dash-home__title">What do you want to achieve today?</h1>
      </div>

      <form className="dash-home__search" onSubmit={handleSubmit}>
        <Sparkles size={18} strokeWidth={1.9} className="dash-home__search-icon" />
        <input
          type="text"
          placeholder="Ask SkillBridge AI anything — improve my resume, plan a roadmap, find internships…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="dash-home__search-submit" aria-label="Submit">
          <ArrowRight size={16} strokeWidth={2.25} />
        </button>
      </form>

      <div className="dash-home__suggestions">
        {SUGGESTION_CARDS.map((s) => {
          const Icon = SUGGESTION_ICONS[s.id]
          return (
            <button
              key={s.id}
              className="dash-home__suggestion"
              onClick={() => navigate(s.to)}
              type="button"
            >
              <Icon size={15} strokeWidth={1.9} />
              {s.title}
            </button>
          )
        })}
      </div>

      <section className="dash-home__stats">
        {STATS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            deltaTone={stat.deltaTone}
          />
        ))}
      </section>

      <div className="dash-home__grid">
        <Card className="dash-home__col">
          <SectionHeader
            title="Recent Activity"
            action={<span onClick={() => navigate('/bookmarks')}>View all</span>}
          />
          <ul className="activity-list">
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.id} className="activity-list__item">
                <span className="activity-list__dot" />
                <div>
                  <p>{item.text}</p>
                  <span>{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="dash-home__col">
          <SectionHeader
            title="Recommended Jobs"
            action={<span onClick={() => navigate('/jobs')}>Browse all</span>}
          />
          <ul className="job-list">
            {RECOMMENDED_JOBS.map((job) => (
              <li key={job.id} className="job-list__item">
                <div className="job-list__icon">
                  <Briefcase size={15} strokeWidth={1.9} />
                </div>
                <div className="job-list__info">
                  <p>{job.title}</p>
                  <span>
                    {job.company} · {job.location}
                  </span>
                </div>
                <Tag tone="dark">{job.match}% match</Tag>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="dash-home__grid">
        <Card className="dash-home__col">
          <SectionHeader
            title="Upcoming Interviews"
            action={<span onClick={() => navigate('/mock-interview')}>Schedule</span>}
          />
          {UPCOMING_INTERVIEWS.length ? (
            <ul className="interview-list">
              {UPCOMING_INTERVIEWS.map((iv) => (
                <li key={iv.id} className="interview-list__item">
                  <div className="interview-list__icon">
                    <Clock size={15} strokeWidth={1.9} />
                  </div>
                  <div>
                    <p>{iv.title}</p>
                    <span>{iv.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dash-home__empty-note">No interviews scheduled yet.</p>
          )}
        </Card>

        <Card className="dash-home__col">
          <SectionHeader
            title="Saved Learning"
            action={<span onClick={() => navigate('/learning')}>Learning Hub</span>}
          />
          <ul className="learning-list">
            {SAVED_LEARNING.map((item) => (
              <li key={item.id} className="learning-list__item">
                <div className="learning-list__top">
                  <span className="learning-list__icon">
                    <BookOpen size={14} strokeWidth={1.9} />
                  </span>
                  <p>{item.title}</p>
                </div>
                <ProgressBar value={item.progress} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
