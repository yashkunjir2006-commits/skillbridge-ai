import { useState } from 'react'
import { Map, GraduationCap, Code2, Layers, Building2, IndianRupee } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Tag from '../components/common/Tag'
import { CAREER_PATHS } from '../data/mockData'
import './CareerRoadmap.css'

export default function CareerRoadmap() {
  const [selectedId, setSelectedId] = useState(CAREER_PATHS[0].id)
  const path = CAREER_PATHS.find((p) => p.id === selectedId)

  return (
    <div>
      <PageHeader
        eyebrow="Career Tools"
        title="Career Roadmap"
        description="Tell SkillBridge AI what you want to become — get a timeline of skills, projects, courses, and outcomes."
      />

      <div className="roadmap-prompt">
        <Map size={16} strokeWidth={2} />
        <span>I want to become</span>
      </div>

      <div className="fp-row" style={{ marginBottom: 28 }}>
        {CAREER_PATHS.map((p) => (
          <button
            key={p.id}
            className={`fp-chip ${selectedId === p.id ? 'fp-chip--active' : ''}`}
            onClick={() => setSelectedId(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="roadmap-summary">
        <Card className="roadmap-summary__card">
          <span className="roadmap-summary__label">Timeline</span>
          <span className="roadmap-summary__value">{path.timeline}</span>
        </Card>
        <Card className="roadmap-summary__card">
          <span className="roadmap-summary__label">
            <IndianRupee size={12} strokeWidth={2.25} style={{ display: 'inline', marginRight: 3 }} />
            Salary Range
          </span>
          <span className="roadmap-summary__value">{path.salary}</span>
        </Card>
        <Card className="roadmap-summary__card">
          <span className="roadmap-summary__label">Target Role</span>
          <span className="roadmap-summary__value">{path.title}</span>
        </Card>
      </div>

      <div className="fp-grid-2">
        <Card>
          <div className="roadmap-block-header">
            <Layers size={16} strokeWidth={1.9} />
            <h3>Skills to Build</h3>
          </div>
          <ul className="roadmap-list">
            {path.skills.map((s, i) => (
              <li key={s}>
                <span className="roadmap-list__index">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="roadmap-block-header">
            <Code2 size={16} strokeWidth={1.9} />
            <h3>Portfolio Projects</h3>
          </div>
          <ul className="roadmap-list">
            {path.projects.map((s, i) => (
              <li key={s}>
                <span className="roadmap-list__index">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="roadmap-block-header">
            <GraduationCap size={16} strokeWidth={1.9} />
            <h3>Courses & Certifications</h3>
          </div>
          <ul className="roadmap-list">
            {path.courses.map((s, i) => (
              <li key={s}>
                <span className="roadmap-list__index">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="roadmap-block-header">
            <Building2 size={16} strokeWidth={1.9} />
            <h3>Job Roles & Companies</h3>
          </div>
          <div className="fp-row" style={{ marginBottom: 12 }}>
            {path.roles.map((r) => (
              <Tag key={r} tone="dark">
                {r}
              </Tag>
            ))}
          </div>
          <div className="fp-row">
            {path.companies.map((c) => (
              <Tag key={c}>{c}</Tag>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
