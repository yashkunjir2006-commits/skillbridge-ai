import { useState } from 'react'
import { Compass, Target, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import './AICareerCoach.css'

const GOALS = [
  { id: 1, text: 'Finish resume revamp', done: true },
  { id: 2, text: 'Complete 2 mock interviews this week', done: false },
  { id: 3, text: 'Apply to 5 roles matching your skills', done: false },
  { id: 4, text: 'Finish the System Design learning track', done: false },
]

export default function AICareerCoach() {
  const [goals, setGoals] = useState(GOALS)
  const [note, setNote] = useState('')

  function toggleGoal(id) {
    setGoals((g) => g.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  }

  const completed = goals.filter((g) => g.done).length
  const pct = Math.round((completed / goals.length) * 100)

  return (
    <div>
      <PageHeader
        eyebrow="Career Tools"
        title="AI Career Coach"
        description="A weekly check-in that keeps your resume, interview prep, and applications on track."
      />

      <div className="fp-grid-2">
        <Card>
          <div className="coach-header">
            <span className="coach-header__icon">
              <Compass size={17} strokeWidth={1.8} />
            </span>
            <div>
              <h3>This week's goals</h3>
              <p>{completed} of {goals.length} complete</p>
            </div>
          </div>
          <ProgressBar value={pct} />

          <ul className="coach-goals">
            {goals.map((g) => (
              <li key={g.id}>
                <button
                  className={`coach-goal ${g.done ? 'coach-goal--done' : ''}`}
                  onClick={() => toggleGoal(g.id)}
                >
                  <CheckCircle2 size={17} strokeWidth={1.8} />
                  <span>{g.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="coach-header">
            <span className="coach-header__icon">
              <Target size={17} strokeWidth={1.8} />
            </span>
            <div>
              <h3>Reflect on this week</h3>
              <p>Jot down what's working and what's blocking you</p>
            </div>
          </div>
          <textarea
            className="coach-note"
            rows={8}
            placeholder="What's on your mind this week?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button onClick={() => setNote('')} variant="secondary">
            Save Reflection
          </Button>
          <p className="fp-note" style={{ marginTop: 16 }}>
            Saved locally in this session — this demo doesn't send your notes anywhere.
          </p>
        </Card>
      </div>
    </div>
  )
}
