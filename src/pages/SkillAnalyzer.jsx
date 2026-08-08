import { useState } from 'react'
import { Gauge, X } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import './SkillAnalyzer.css'

const ROLE_PROFILES = [
  { role: 'Frontend Developer', required: ['react', 'javascript', 'css', 'git', 'typescript'], salary: '₹6–15 LPA' },
  { role: 'Backend Developer', required: ['node', 'sql', 'git', 'api design', 'docker'], salary: '₹7–16 LPA' },
  { role: 'ML Engineer', required: ['python', 'machine learning', 'sql', 'git', 'pytorch'], salary: '₹9–20 LPA' },
]

export default function SkillAnalyzer() {
  const [skills, setSkills] = useState(['python', 'git', 'react'])
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  function addSkill(e) {
    e.preventDefault()
    const v = input.trim().toLowerCase()
    if (v && !skills.includes(v)) setSkills((s) => [...s, v])
    setInput('')
  }

  function removeSkill(s) {
    setSkills((list) => list.filter((x) => x !== s))
  }

  function analyze() {
    const owned = new Set(skills)
    const scored = ROLE_PROFILES.map((p) => {
      const have = p.required.filter((r) => owned.has(r))
      const missing = p.required.filter((r) => !owned.has(r))
      const fit = Math.round((have.length / p.required.length) * 100)
      return { ...p, have, missing, fit }
    }).sort((a, b) => b.fit - a.fit)
    setResult(scored)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Career Tools"
        title="Skill Analyzer"
        description="Add the skills you have. SkillBridge AI checks career fit against common role profiles and shows what's missing."
      />

      <Card style={{ marginBottom: 24 }}>
        <form className="skill-input-row" onSubmit={addSkill}>
          <input
            type="text"
            placeholder="Add a skill — e.g. React, SQL, Docker…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="fp-row" style={{ marginTop: 16 }}>
          {skills.map((s) => (
            <span key={s} className="skill-chip">
              {s}
              <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                <X size={12} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
        <Button icon={Gauge} onClick={analyze} style={{ marginTop: 18 }}>
          Analyze Skills
        </Button>
      </Card>

      {result && (
        <div className="fp-grid-3">
          {result.map((r) => (
            <Card key={r.role} className="skill-fit-card">
              <div className="skill-fit-card__top">
                <h3>{r.role}</h3>
                <span className="skill-fit-card__fit">{r.fit}%</span>
              </div>
              <p className="skill-fit-card__salary">{r.salary}</p>
              <div className="skill-fit-card__section">
                <span>You have</span>
                <div className="fp-row">
                  {r.have.length ? (
                    r.have.map((s) => (
                      <Tag key={s} tone="success">
                        {s}
                      </Tag>
                    ))
                  ) : (
                    <span className="fp-note">None yet</span>
                  )}
                </div>
              </div>
              <div className="skill-fit-card__section">
                <span>Missing</span>
                <div className="fp-row">
                  {r.missing.length ? (
                    r.missing.map((s) => (
                      <Tag key={s} tone="danger">
                        {s}
                      </Tag>
                    ))
                  ) : (
                    <span className="fp-note">Fully covered</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
