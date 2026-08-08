import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Send, Sparkles, Info } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import './AIChat.css'

const CANNED_RESPONSES = [
  {
    match: /(resume|cv)/i,
    reply:
      "For resume help, head to the Resume Builder — it can generate a draft and score an existing resume against structure, action verbs, and measurable impact.",
  },
  {
    match: /(interview)/i,
    reply:
      "Mock Interview has behavioral, technical, HR, coding, and system design tracks with a feedback summary at the end of each session.",
  },
  {
    match: /(roadmap|become|career path)/i,
    reply:
      "Career Roadmap can lay out a timeline, skills, projects, and courses for a role — try Software Engineer, Data Scientist, Frontend Developer, AI Engineer, Cloud Engineer, or Cyber Security Engineer.",
  },
  {
    match: /(job|internship)/i,
    reply:
      "Job Matching and Internship Hub both rank listings by how well they fit your skills, experience, and location.",
  },
  {
    match: /(skill|learn)/i,
    reply:
      "Skill Analyzer can show missing skills and career fit based on what you already know, and Learning Hub has tracks across DSA, React, Python, AI, and more.",
  },
]

const DEFAULT_REPLY =
  "That's a good question to dig into. Try one of the specific tools in the sidebar — Resume, ATS Score, Roadmap, or Mock Interview — for a more focused answer, or ask me about resumes, interviews, roadmaps, jobs, or skills."

export default function AIChat() {
  const location = useLocation()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi, I'm the SkillBridge AI assistant. Ask me about resumes, interviews, roadmaps, jobs, or skills.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    const prefill = location.state?.prompt
    if (prefill) {
      setInput(prefill)
    }
  }, [location.state])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function send(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const hit = CANNED_RESPONSES.find((r) => r.match.test(trimmed))
      setMessages((m) => [...m, { role: 'assistant', text: hit ? hit.reply : DEFAULT_REPLY }])
      setTyping(false)
    }, 500)
  }

  return (
    <div className="ai-chat-page">
      <PageHeader
        eyebrow="Build"
        title="AI Chat"
        description="Ask career, resume, coding, or interview questions."
      />

      <div className="ai-chat-disclaimer">
        <Info size={14} strokeWidth={2} />
        This is a rule-based demo assistant that matches keywords to canned answers — it isn't
        connected to a live AI model.
      </div>

      <Card className="ai-chat" padded={false}>
        <div className="ai-chat__messages">
          {messages.map((m, i) => (
            <div key={i} className={`ai-chat__msg ai-chat__msg--${m.role}`}>
              {m.role === 'assistant' && (
                <span className="ai-chat__avatar">
                  <Sparkles size={13} strokeWidth={2} />
                </span>
              )}
              <p>{m.text}</p>
            </div>
          ))}
          {typing && (
            <div className="ai-chat__msg ai-chat__msg--assistant">
              <span className="ai-chat__avatar">
                <Sparkles size={13} strokeWidth={2} />
              </span>
              <p className="ai-chat__typing">
                <span />
                <span />
                <span />
              </p>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          className="ai-chat__composer"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
        >
          <input
            type="text"
            placeholder="Ask about resumes, interviews, roadmaps, jobs…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Send">
            <Send size={16} strokeWidth={2.25} />
          </button>
        </form>
      </Card>
    </div>
  )
}
