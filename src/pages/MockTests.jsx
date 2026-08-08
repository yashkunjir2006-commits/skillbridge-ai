import { useState } from 'react'
import { ListChecks, Timer, Trophy, RotateCcw } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import { MOCK_TEST_CATEGORIES, LEADERBOARD } from '../data/mockData'
import './MockTests.css'

const SAMPLE_QUESTIONS = [
  {
    q: 'Which data structure uses FIFO ordering?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    answer: 1,
  },
  {
    q: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
    answer: 2,
  },
  {
    q: 'Which HTTP method is idempotent?',
    options: ['POST', 'PATCH', 'PUT', 'CONNECT'],
    answer: 2,
  },
]

export default function MockTests() {
  const [active, setActive] = useState(null)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  function startTest(cat) {
    setActive(cat)
    setQIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setFinished(false)
  }

  function choose(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === SAMPLE_QUESTIONS[qIndex].answer) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (qIndex < SAMPLE_QUESTIONS.length - 1) {
      setQIndex((i) => i + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  if (active && !finished) {
    const question = SAMPLE_QUESTIONS[qIndex]
    return (
      <div>
        <PageHeader eyebrow="Practice" title={`${active.title} — Mock Test`} />
        <Card className="mock-test__quiz">
          <div className="mock-test__quiz-top">
            <span>
              Question {qIndex + 1} of {SAMPLE_QUESTIONS.length}
            </span>
            <span className="mock-test__timer">
              <Timer size={14} strokeWidth={2} />
              {active.duration}
            </span>
          </div>
          <ProgressBar value={((qIndex + 1) / SAMPLE_QUESTIONS.length) * 100} />
          <h3 className="mock-test__question">{question.q}</h3>
          <div className="mock-test__options">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answer
              const isSelected = i === selected
              let cls = 'mock-test__option'
              if (selected !== null && isCorrect) cls += ' mock-test__option--correct'
              else if (isSelected) cls += ' mock-test__option--wrong'
              return (
                <button key={opt} className={cls} onClick={() => choose(i)}>
                  {opt}
                </button>
              )
            })}
          </div>
          {selected !== null && (
            <Button onClick={next}>{qIndex < SAMPLE_QUESTIONS.length - 1 ? 'Next' : 'Finish'}</Button>
          )}
        </Card>
      </div>
    )
  }

  if (active && finished) {
    const pct = Math.round((correctCount / SAMPLE_QUESTIONS.length) * 100)
    return (
      <div>
        <PageHeader eyebrow="Practice" title="Test Complete" />
        <Card>
          <div className="mock-test__result">
            <Trophy size={22} strokeWidth={1.75} />
            <div>
              <h3>{pct}% score</h3>
              <p>
                {correctCount} of {SAMPLE_QUESTIONS.length} correct — {active.title}
              </p>
            </div>
          </div>
          <Button variant="secondary" icon={RotateCcw} onClick={() => setActive(null)}>
            Back to Mock Tests
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Mock Tests"
        description="Timed tests across aptitude, logical reasoning, and programming languages."
      />

      <div className="fp-grid-4" style={{ marginBottom: 32 }}>
        {MOCK_TEST_CATEGORIES.map((cat) => (
          <Card key={cat.id} hover className="mock-test__card" onClick={() => startTest(cat)}>
            <span className="mock-test__icon">
              <ListChecks size={16} strokeWidth={1.8} />
            </span>
            <h3>{cat.title}</h3>
            <p>
              {cat.questions} questions · {cat.duration}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="section-header" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600 }}>Leaderboard</h2>
        </div>
        <ul className="mock-test__leaderboard">
          {LEADERBOARD.map((entry, i) => (
            <li
              key={entry.id}
              className={`mock-test__leaderboard-item ${entry.isUser ? 'mock-test__leaderboard-item--user' : ''}`}
            >
              <span className="mock-test__rank">{i + 1}</span>
              <span className="mock-test__name">{entry.name}</span>
              <span className="mock-test__score">{entry.score} pts</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
