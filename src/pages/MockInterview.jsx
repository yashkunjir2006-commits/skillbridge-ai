import { useState } from 'react'
import { Mic, Video, ChevronRight, RotateCcw } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import Tag from '../components/common/Tag'
import './MockInterview.css'

const TYPES = ['Behavioral', 'Technical', 'HR', 'Coding', 'System Design']

const QUESTIONS = {
  Behavioral: [
    'Tell me about a time you disagreed with a teammate. How did you handle it?',
    'Describe a project where you had to coordinate a team rather than code it yourself.',
    'What is a mistake you made recently, and what did you learn from it?',
  ],
  Technical: [
    'Walk me through how you would optimize a slow SQL query.',
    'Explain the tradeoffs between a hash map and a balanced binary search tree.',
    'How would you debug a memory leak in a long-running service?',
  ],
  HR: [
    'Why do you want to work here?',
    'Where do you see yourself in three years?',
    'How do you handle tight deadlines and competing priorities?',
  ],
  Coding: [
    'Given an array, find the longest subarray with a sum equal to k.',
    'Reverse a linked list in place.',
    'Design a function to detect a cycle in a graph.',
  ],
  'System Design': [
    'Design a URL shortener that handles 10M requests a day.',
    'How would you design a notification system for a large app?',
    'Sketch the architecture for a real-time chat application.',
  ],
}

export default function MockInterview() {
  const [type, setType] = useState('Behavioral')
  const [stage, setStage] = useState('setup') // setup | session | feedback
  const [qIndex, setQIndex] = useState(0)
  const [answer, setAnswer] = useState('')

  function startSession() {
    setQIndex(0)
    setAnswer('')
    setStage('session')
  }

  function nextQuestion() {
    if (qIndex < QUESTIONS[type].length - 1) {
      setQIndex((i) => i + 1)
      setAnswer('')
    } else {
      setStage('feedback')
    }
  }

  function restart() {
    setStage('setup')
    setQIndex(0)
    setAnswer('')
  }

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Mock Interview"
        description="Practice behavioral, technical, HR, coding, and system design rounds with structured feedback."
      />

      {stage === 'setup' && (
        <Card>
          <h3 className="mock-interview__section-title">Choose an interview type</h3>
          <div className="fp-row" style={{ marginBottom: 20 }}>
            {TYPES.map((t) => (
              <button
                key={t}
                className={`fp-chip ${type === t ? 'fp-chip--active' : ''}`}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mock-interview__modes">
            <Tag icon={Mic}>Voice Ready</Tag>
            <Tag icon={Video}>Camera Ready</Tag>
          </div>
          <p className="fp-note" style={{ margin: '18px 0' }}>
            This session runs as a text-based Q&A demo — {QUESTIONS[type].length} questions, with a
            feedback summary at the end.
          </p>
          <Button onClick={startSession}>Start Interview</Button>
        </Card>
      )}

      {stage === 'session' && (
        <Card>
          <div className="mock-interview__progress-row">
            <span>
              Question {qIndex + 1} of {QUESTIONS[type].length}
            </span>
            <Tag tone="dark">{type}</Tag>
          </div>
          <ProgressBar value={((qIndex + 1) / QUESTIONS[type].length) * 100} />
          <h3 className="mock-interview__question">{QUESTIONS[type][qIndex]}</h3>
          <textarea
            className="mock-interview__answer"
            rows={6}
            placeholder="Type your answer…"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button icon={ChevronRight} iconPosition="right" onClick={nextQuestion}>
            {qIndex < QUESTIONS[type].length - 1 ? 'Next Question' : 'Finish'}
          </Button>
        </Card>
      )}

      {stage === 'feedback' && (
        <Card>
          <h3 className="mock-interview__section-title">Session Feedback</h3>
          <div className="fp-stack" style={{ marginBottom: 20 }}>
            <ProgressBar label="Confidence" value={78} />
            <ProgressBar label="Eye Contact" value={70} />
            <ProgressBar label="Speech Pace" value={82} />
            <ProgressBar label="Grammar" value={88} />
          </div>
          <div className="mock-interview__overall">
            <span>Overall Score</span>
            <span className="mock-interview__overall-value">80%</span>
          </div>
          <p className="fp-note" style={{ margin: '18px 0' }}>
            Strong structure overall — try quantifying outcomes more in your {type.toLowerCase()}{' '}
            answers, and keep responses under two minutes for better pacing.
          </p>
          <Button variant="secondary" icon={RotateCcw} onClick={restart}>
            Practice Again
          </Button>
        </Card>
      )}
    </div>
  )
}
