import { Mail, Phone, MapPin } from 'lucide-react'
import { getTemplate } from '../../data/resumeTemplates'
import './ResumeA4Preview.css'

export default function ResumeA4Preview({ templateId, data, scale = 1 }) {
  const t = getTemplate(templateId)
  const isSidebar = t.layout === 'sidebar'

  const Header = (
    <div className={`a4-preview__header a4-preview__header--${t.headerStyle}`}>
      <h1 style={{ color: isSidebar ? '#ffffff' : '#111111' }}>{data.name || 'Your Name'}</h1>
      <p style={{ color: t.accent }}>{data.role || 'Target Role'}</p>
      <div className="a4-preview__contact">
        <span>
          <Mail size={10} /> you@email.com
        </span>
        <span>
          <Phone size={10} /> +91 90000 00000
        </span>
        <span>
          <MapPin size={10} /> Pune, India
        </span>
      </div>
    </div>
  )

  const SkillsBlock = data.skills?.length > 0 && (
    <div className="a4-preview__section">
      <h3 style={{ color: t.accent }}>Skills</h3>
      <div className="a4-preview__skills">
        {data.skills.map((s) => (
          <span key={s} style={{ borderColor: t.accent + '55' }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )

  const body = (
    <>
      {data.summary && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}

      {!isSidebar && SkillsBlock}

      {data.experienceBullets?.length > 0 && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Experience</h3>
          <ul>
            {data.experienceBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Projects</h3>
          {data.projects.map((p, i) => (
            <div key={i} className="a4-preview__project">
              <strong>{p.title}</strong>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      )}

      {data.education && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Education</h3>
          <p>{data.education}</p>
        </div>
      )}

      {data.achievements?.length > 0 && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Achievements</h3>
          <ul>
            {data.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {data.certifications && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Certifications</h3>
          <p>{data.certifications}</p>
        </div>
      )}

      {data.interests?.length > 0 && (
        <div className="a4-preview__section">
          <h3 style={{ color: t.accent }}>Interests</h3>
          <p>{data.interests.join(' · ')}</p>
        </div>
      )}
    </>
  )

  return (
    <div className="a4-preview__wrap" style={{ '--scale': scale }}>
      <div
        className={`a4-preview a4-preview--${t.layout}`}
        style={{ fontFamily: t.font, borderTop: !isSidebar ? `5px solid ${t.accent}` : 'none' }}
        id="resume-print-area"
      >
        {isSidebar ? (
          <>
            <aside className="a4-preview__sidebar" style={{ background: t.accent }}>
              {Header}
              {SkillsBlock}
            </aside>
            <div className="a4-preview__main">{body}</div>
          </>
        ) : (
          <div className="a4-preview__main a4-preview__main--full">
            {Header}
            {body}
          </div>
        )}
      </div>
    </div>
  )
}
