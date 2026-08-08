import { useMemo, useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import TopicCard from '../components/learning/TopicCard'
import TopicDetail from '../components/learning/TopicDetail'
import AIRoadmapGenerator from '../components/learning/AIRoadmapGenerator'
import { LEARNING_TOPICS } from '../data/learningResources'
import { DEFAULT_PROGRESS } from '../data/learningProgress'
import './LearningHub.css'

export default function LearningHub() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS)
  const [selectedId, setSelectedId] = useState(null)
  const [completedResources, setCompletedResources] = useState(new Set())

  const selectedTopic = useMemo(
    () => LEARNING_TOPICS.find((t) => t.id === selectedId) || null,
    [selectedId]
  )

  function handleCompleteResource(key) {
    setCompletedResources((prev) => {
      const next = new Set(prev)
      const wasCompleted = next.has(key)
      if (wasCompleted) next.delete(key)
      else next.add(key)

      const topicId = key.split('-')[0]
      setProgress((p) => {
        const t = p[topicId]
        if (!t) return p
        const delta = wasCompleted ? -1 : 1
        const lessonsCompleted = Math.max(0, Math.min(t.totalLessons, t.lessonsCompleted + delta))
        const percent = Math.round((lessonsCompleted / t.totalLessons) * 100)
        return {
          ...p,
          [topicId]: { ...t, lessonsCompleted, percent, lastStudied: 'Just now' },
        }
      })

      return next
    })
  }

  return (
    <div className="glass-scope">
      <PageHeader
        eyebrow="Practice"
        title="Learning Hub"
        description="Structured learning paths with trusted resources, progress tracking, quizzes, and an AI-generated roadmap based on your resume."
      />

      <AIRoadmapGenerator />

      <div className="learning-hub__grid">
        {LEARNING_TOPICS.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={progress[topic.id]}
            onClick={() => setSelectedId(topic.id)}
          />
        ))}
      </div>

      {selectedTopic && (
        <div className="learning-hub__detail-overlay" onClick={() => setSelectedId(null)}>
          <div onClick={(e) => e.stopPropagation()} className="learning-hub__detail-wrap">
            <TopicDetail
              topic={selectedTopic}
              progress={progress[selectedTopic.id]}
              onClose={() => setSelectedId(null)}
              onCompleteResource={handleCompleteResource}
              completedResources={completedResources}
            />
          </div>
        </div>
      )}
    </div>
  )
}
