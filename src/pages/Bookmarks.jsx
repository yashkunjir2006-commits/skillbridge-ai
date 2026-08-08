import { Bookmark, Briefcase, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import EmptyState from '../components/common/EmptyState'
import Tag from '../components/common/Tag'
import { RECOMMENDED_JOBS, SAVED_LEARNING } from '../data/mockData'

export default function Bookmarks() {
  const navigate = useNavigate()
  const hasBookmarks = RECOMMENDED_JOBS.length > 0 || SAVED_LEARNING.length > 0

  return (
    <div>
      <PageHeader
        eyebrow="More"
        title="Bookmarks"
        description="Everything you've saved across jobs, courses, and resources."
      />

      {!hasBookmarks ? (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Bookmark jobs, courses, or roadmaps and they'll show up here."
        />
      ) : (
        <div className="fp-grid-2">
          <Card>
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Saved Jobs</h2>
            </div>
            <ul>
              {RECOMMENDED_JOBS.map((job) => (
                <li key={job.id} className="fp-list-item">
                  <div className="fp-list-icon">
                    <Briefcase size={16} strokeWidth={1.8} />
                  </div>
                  <div className="fp-list-info">
                    <h4>{job.title}</h4>
                    <p>{job.company}</p>
                  </div>
                  <Tag tone="dark">{job.match}%</Tag>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="section-header" style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Saved Learning</h2>
            </div>
            <ul>
              {SAVED_LEARNING.map((item) => (
                <li
                  key={item.id}
                  className="fp-list-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/learning')}
                >
                  <div className="fp-list-icon">
                    <BookOpen size={16} strokeWidth={1.8} />
                  </div>
                  <div className="fp-list-info">
                    <h4>{item.title}</h4>
                    <p>{item.progress}% complete</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
