import { useState } from 'react'
import { GraduationCap, CalendarClock } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import { INTERNSHIP_LISTINGS } from '../data/mockData'
import './Internships.css'

export default function Internships() {
  const [tracked, setTracked] = useState({})

  function track(id) {
    setTracked((t) => ({ ...t, [id]: true }))
  }

  return (
    <div>
      <PageHeader
        eyebrow="Opportunities"
        title="Internship Hub"
        description="Best-fit internship recommendations with an application tracker and deadline reminders."
      />

      <div className="fp-stack" style={{ marginBottom: 32 }}>
        {INTERNSHIP_LISTINGS.map((item) => (
          <Card key={item.id} className="internship-card">
            <div className="internship-card__icon">
              <GraduationCap size={18} strokeWidth={1.8} />
            </div>
            <div className="internship-card__info">
              <div className="internship-card__title-row">
                <h3>{item.title}</h3>
                <Tag tone="dark">{item.match}% match</Tag>
              </div>
              <p>
                {item.company} · {item.location} · {item.duration}
              </p>
              <span className="internship-card__deadline">
                <CalendarClock size={12} strokeWidth={2.25} />
                Apply by {item.deadline}
              </span>
            </div>
            <Button
              size="sm"
              variant={tracked[item.id] ? 'secondary' : 'primary'}
              onClick={() => track(item.id)}
              disabled={tracked[item.id]}
            >
              {tracked[item.id] ? 'Tracking' : 'Track Application'}
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <div className="section-header" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600 }}>Application Tracker</h2>
        </div>
        {Object.keys(tracked).length === 0 ? (
          <p className="fp-note">Track an internship above to see it appear here.</p>
        ) : (
          <ul>
            {INTERNSHIP_LISTINGS.filter((i) => tracked[i.id]).map((i) => (
              <li key={i.id} className="fp-list-item">
                <div className="fp-list-icon">
                  <GraduationCap size={16} strokeWidth={1.8} />
                </div>
                <div className="fp-list-info">
                  <h4>{i.title}</h4>
                  <p>{i.company} · Deadline {i.deadline}</p>
                </div>
                <Tag tone="warning">In progress</Tag>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
