import { useState } from 'react'
import { X, ExternalLink, CheckCircle2, Circle, Star, Clock, Users } from 'lucide-react'
import TopicQuiz from './TopicQuiz'
import LearningMentorChat from './LearningMentorChat'
import Tag from '../common/Tag'
import './TopicDetail.css'

const SUB_TABS = ['Resources', 'Quiz', 'Projects', 'AI Mentor']

export default function TopicDetail({ topic, progress, onClose, onCompleteResource, completedResources }) {
  const [subTab, setSubTab] = useState('Resources')

  return (
    <div className="topic-detail glass-card">
      <div className="topic-detail__header">
        <div>
          <h2>{topic.title}</h2>
          <div className="topic-detail__meta">
            <span>
              <Clock size={12} /> {topic.estimatedHours}h estimated
            </span>
            <span>
              <Star size={12} /> {topic.rating} community rating
            </span>
            <span>
              <Users size={12} /> {progress.lessonsCompleted}/{progress.totalLessons} lessons done
            </span>
          </div>
          {topic.prerequisites.length > 0 && (
            <div className="fp-row" style={{ marginTop: 10 }}>
              {topic.prerequisites.map((p) => (
                <Tag key={p}>{p}</Tag>
              ))}
            </div>
          )}
        </div>
        <button className="topic-detail__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="glass-tabs" style={{ marginTop: 18 }}>
        {SUB_TABS.map((t) => (
          <button
            key={t}
            className={`glass-tab ${subTab === t ? 'glass-tab--active' : ''}`}
            onClick={() => setSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {subTab === 'Resources' && (
        <div className="topic-detail__resources">
          {topic.resources.map((r) => {
            const key = `${topic.id}-${r.title}`
            const isDone = completedResources.has(key)
            return (
              <div key={key} className="resource-row">
                <button
                  className="resource-row__check"
                  onClick={() => onCompleteResource(key)}
                  aria-label="Mark complete"
                >
                  {isDone ? <CheckCircle2 size={18} color="#16a34a" /> : <Circle size={18} color="#c4c4d4" />}
                </button>
                <div className="resource-row__info">
                  <div className="resource-row__title-line">
                    <strong>{r.title}</strong>
                    <Tag tone={r.free ? 'success' : 'neutral'}>{r.free ? 'Free' : 'Paid'}</Tag>
                  </div>
                  <p>
                    {r.provider} · {r.type} · {r.duration} · ⭐ {r.rating}
                  </p>
                </div>
                <a href={r.url} target="_blank" rel="noreferrer" className="resource-row__link">
                  <ExternalLink size={15} />
                </a>
              </div>
            )
          })}
        </div>
      )}

      {subTab === 'Quiz' && (
        <div className="glass-card glass-card--tight" style={{ marginTop: 16 }}>
          <TopicQuiz questions={topic.quiz} />
        </div>
      )}

      {subTab === 'Projects' && (
        <div className="topic-detail__projects">
          {topic.projects.map((p) => (
            <div key={p.title} className="topic-detail__project-card">
              <span>{p.title}</span>
              <Tag tone={p.difficulty === 'Advanced' ? 'danger' : p.difficulty === 'Intermediate' ? 'warning' : 'success'}>
                {p.difficulty}
              </Tag>
            </div>
          ))}
        </div>
      )}

      {subTab === 'AI Mentor' && (
        <div className="glass-card glass-card--tight" style={{ marginTop: 16 }}>
          <LearningMentorChat topicTitle={topic.title} />
        </div>
      )}
    </div>
  )
}
