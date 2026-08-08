import { Clock, Star, BarChart3, Lock } from 'lucide-react'
import './TopicCard.css'

const DIFFICULTY_TONE = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' }

export default function TopicCard({ topic, progress, onClick }) {
  return (
    <button className="topic-card glass-card" onClick={onClick} type="button">
      <div className="topic-card__top">
        <h3>{topic.title}</h3>
        <span className={`topic-card__difficulty topic-card__difficulty--${DIFFICULTY_TONE[topic.difficulty]}`}>
          {topic.difficulty}
        </span>
      </div>

      <div className="topic-card__meta">
        <span>
          <Clock size={12} /> {topic.estimatedHours}h
        </span>
        <span>
          <Star size={12} /> {topic.rating}
        </span>
        <span>
          <BarChart3 size={12} /> {progress.percent}%
        </span>
      </div>

      <div className="glass-progress">
        <div className="glass-progress__fill" style={{ width: `${progress.percent}%` }} />
      </div>

      <div className="topic-card__footer">
        <span>{progress.lessonsCompleted}/{progress.totalLessons} lessons</span>
        <span>Last studied: {progress.lastStudied}</span>
      </div>

      {topic.prerequisites.length > 0 && (
        <div className="topic-card__prereq">
          <Lock size={11} />
          {topic.prerequisites[0]}
          {topic.prerequisites.length > 1 ? ` +${topic.prerequisites.length - 1} more` : ''}
        </div>
      )}
    </button>
  )
}
