import { useMemo, useState } from 'react'
import { Briefcase, MapPin, Search, Bookmark, BookmarkCheck } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import EmptyState from '../components/common/EmptyState'
import { JOB_LISTINGS } from '../data/mockData'
import './Jobs.css'

export default function Jobs() {
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState(new Set())
  const [applied, setApplied] = useState(new Set())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return JOB_LISTINGS
    return JOB_LISTINGS.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q))
    )
  }, [query])

  function toggleSave(id) {
    setSaved((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function apply(id) {
    setApplied((s) => new Set(s).add(id))
  }

  return (
    <div>
      <PageHeader
        eyebrow="Opportunities"
        title="Job Matching"
        description="Roles ranked by how well they match your skills, experience, and preferences."
      />

      <div className="jobs-search">
        <Search size={15} strokeWidth={2} />
        <input
          type="text"
          placeholder="Search by role, company, or skill…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No matching jobs"
          description="Try a different role, skill, or company name."
        />
      ) : (
        <div className="fp-stack">
          {filtered.map((job) => (
            <Card key={job.id} className="job-card">
              <div className="job-card__icon">
                <Briefcase size={18} strokeWidth={1.8} />
              </div>
              <div className="job-card__info">
                <div className="job-card__title-row">
                  <h3>{job.title}</h3>
                  <Tag tone="dark">{job.match}% match</Tag>
                </div>
                <p className="job-card__meta">
                  {job.company} · <MapPin size={12} style={{ display: 'inline', margin: '0 2px -1px' }} />
                  {job.location} · {job.type}
                </p>
                <div className="fp-row">
                  {job.skills.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
              <div className="job-card__actions">
                <button className="job-card__save" onClick={() => toggleSave(job.id)}>
                  {saved.has(job.id) ? (
                    <BookmarkCheck size={17} strokeWidth={1.9} />
                  ) : (
                    <Bookmark size={17} strokeWidth={1.9} />
                  )}
                </button>
                <Button
                  size="sm"
                  variant={applied.has(job.id) ? 'secondary' : 'primary'}
                  onClick={() => apply(job.id)}
                  disabled={applied.has(job.id)}
                >
                  {applied.has(job.id) ? 'Applied' : 'Apply'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
