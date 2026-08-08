import { useState } from 'react'
import { Send, GraduationCap, Info } from 'lucide-react'
import './LearningMentorChat.css'

function buildReply(topicTitle, question) {
  const q = question.toLowerCase()
  if (q.includes('quiz')) {
    return `Head to the Quiz tab above for a short ${topicTitle} check — it's a quicker way to test yourself than a text answer here.`
  }
  if (q.includes('project')) {
    return `Check the Projects tab for ${topicTitle}-specific build ideas scoped by difficulty — a good next step after a few lessons.`
  }
  if (q.includes('explain') || q.includes('what is') || q.includes('how does')) {
    return `Good instinct to ask for an explanation. The Resources tab has the official docs and a full course for ${topicTitle} — that'll go deeper and stay accurate than a short answer here.`
  }
  return `For ${topicTitle}, the fastest path is usually: official docs first for correctness, then a video course for intuition, then practice problems to lock it in. Check the Resources tab for links to each.`
}

export default function LearningMentorChat({ topicTitle }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Ask me about ${topicTitle} — I can point you to the right resource, quiz, or project.` },
  ])
  const [input, setInput] = useState('')

  function send() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: buildReply(topicTitle, trimmed) }])
    }, 400)
  }

  return (
    <div className="mentor-chat">
      <div className="mentor-chat__disclaimer">
        <Info size={12} />
        Rule-based mentor — routes you to resources rather than generating new explanations.
      </div>
      <div className="mentor-chat__messages">
        {messages.map((m, i) => (
          <div key={i} className={`mentor-chat__msg mentor-chat__msg--${m.role}`}>
            {m.role === 'assistant' && (
              <span className="mentor-chat__avatar">
                <GraduationCap size={12} />
              </span>
            )}
            <p>{m.text}</p>
          </div>
        ))}
      </div>
      <div className="mentor-chat__composer">
        <input
          type="text"
          placeholder={`Ask about ${topicTitle}…`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button onClick={send} aria-label="Send">
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
