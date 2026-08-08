import { Check } from 'lucide-react'
import { RESUME_TEMPLATES } from '../../data/resumeTemplates'
import ResumeA4Preview from './ResumeA4Preview'
import './TemplateGallery.css'

const THUMB_DATA = {
  name: 'Yash',
  role: 'AI/ML Engineer',
  summary: 'Computer Engineering student focused on AI/ML.',
  skills: ['Python', 'React', 'Git'],
  experienceBullets: ['Built and evaluated regression models', 'Reduced inference time by 22%'],
  projects: [{ title: 'AI Career Mentor', body: 'CLI tool using a Random Forest classifier.' }],
  education: 'B.Tech, Computer Engineering',
}

export default function TemplateGallery({ selectedId, onSelect }) {
  return (
    <div className="template-gallery">
      {RESUME_TEMPLATES.map((t) => (
        <button
          key={t.id}
          className={`template-card ${selectedId === t.id ? 'template-card--active' : ''}`}
          onClick={() => onSelect(t.id)}
          type="button"
        >
          <div className="a4-thumb">
            <div className="a4-thumb__inner">
              <ResumeA4Preview templateId={t.id} data={THUMB_DATA} scale={1} />
            </div>
          </div>
          <span className="template-card__name">{t.name}</span>
          {selectedId === t.id && (
            <span className="template-card__check">
              <Check size={12} strokeWidth={3} />
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
