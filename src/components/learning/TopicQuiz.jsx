import { useState } from 'react'
import { Trophy, RotateCcw } from 'lucide-react'
import './TopicQuiz.css'

export default function TopicQuiz({ questions, onComplete }) {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  function choose(i) {
    if (selected !== null) return
    setSelected(i)
    if (i === questions[qIndex].answer) setCorrect((c) => c + 1)
  }

  function next() {
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1)
      setSelected(null)
    } else {
      setDone(true)
      onComplete?.(Math.round(((correct + (selected === questions[qIndex].answer ? 1 : 0)) / questions.length) * 100))
    }
  }

  function restart() {
    setQIndex(0)
    setSelected(null)
    setCorrect(0)
    setDone(false)
  }

  if (done) {
    const pct = Math.round((correct / questions.length) * 100)
    return (
      <div className="topic-quiz__result">
        <Trophy size={20} strokeWidth={1.7} />
        <div>
          <h4>{pct}% correct</h4>
          <p>{correct} of {questions.length} questions</p>
        </div>
        <button className="glass-btn glass-btn--ghost" onClick={restart}>
          <RotateCcw size={13} />
          Retry
        </button>
      </div>
    )
  }

  const question = questions[qIndex]

  return (
    <div className="topic-quiz">
      <div className="topic-quiz__top">
        <span>Question {qIndex + 1} of {questions.length}</span>
      </div>
      <p className="topic-quiz__q">{question.q}</p>
      <div className="topic-quiz__options">
        {question.options.map((opt, i) => {
          let cls = 'topic-quiz__option'
          if (selected !== null && i === question.answer) cls += ' topic-quiz__option--correct'
          else if (selected === i) cls += ' topic-quiz__option--wrong'
          return (
            <button key={opt} className={cls} onClick={() => choose(i)}>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <button className="glass-btn" onClick={next} style={{ marginTop: 14 }}>
          {qIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  )
}
