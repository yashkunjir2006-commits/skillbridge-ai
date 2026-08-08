import { useState } from 'react'
import { FolderKanban, Shuffle, Code2 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import { PROJECT_IDEAS } from '../data/mockData'
import './ProjectBuilder.css'

const EXTRA_IDEAS = [
  { id: 5, title: 'Personal Finance Dashboard', difficulty: 'Intermediate', stack: ['React', 'D3.js', 'Node.js'], resumeValue: 'Medium' },
  { id: 6, title: 'AI-Powered Code Reviewer', difficulty: 'Advanced', stack: ['Python', 'FastAPI', 'OpenAI-style API'], resumeValue: 'High' },
  { id: 7, title: 'Habit Tracker PWA', difficulty: 'Beginner', stack: ['React', 'IndexedDB'], resumeValue: 'Low' },
]

export default function ProjectBuilder() {
  const [ideas, setIdeas] = useState(PROJECT_IDEAS)

  function generateMore() {
    const pool = EXTRA_IDEAS.filter((e) => !ideas.some((i) => i.id === e.id))
    if (pool.length === 0) return
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setIdeas((list) => [...list, pick])
  }

  return (
    <div>
      <PageHeader
        eyebrow="Build"
        title="Project Builder"
        description="Portfolio-worthy project ideas scoped by difficulty, tech stack, and resume value."
        actions={
          <Button icon={Shuffle} onClick={generateMore}>
            Suggest Another
          </Button>
        }
      />

      <div className="fp-grid-3">
        {ideas.map((idea) => (
          <Card key={idea.id} hover className="project-card">
            <div className="project-card__icon">
              <FolderKanban size={17} strokeWidth={1.8} />
            </div>
            <h3>{idea.title}</h3>
            <div className="fp-row" style={{ marginBottom: 12 }}>
              <Tag
                tone={
                  idea.difficulty === 'Advanced'
                    ? 'danger'
                    : idea.difficulty === 'Intermediate'
                    ? 'warning'
                    : 'success'
                }
              >
                {idea.difficulty}
              </Tag>
              <Tag tone={idea.resumeValue === 'High' ? 'dark' : 'neutral'}>
                {idea.resumeValue} resume value
              </Tag>
            </div>
            <div className="fp-row" style={{ marginBottom: 16 }}>
              {idea.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <button className="project-card__github">
              <Code2 size={14} strokeWidth={1.9} />
              GitHub Ready
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}
