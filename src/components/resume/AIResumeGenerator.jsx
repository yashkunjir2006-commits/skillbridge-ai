import { useState } from 'react'
import { Sparkles, Download, FileDown, RefreshCw } from 'lucide-react'
import TemplateGallery from './TemplateGallery'
import ResumeA4Preview from './ResumeA4Preview'
import Skeleton from '../common/Skeleton'
import {
  generateSummary,
  generateExperienceBullets,
  generateProjectDescriptions,
  generateAchievements,
  generateInterests,
} from '../../utils/resumeGenerator'
import './AIResumeGenerator.css'

const LEVELS = ['Fresher', 'Intermediate', 'Experienced']

const DEFAULT_INPUTS = {
  name: 'Yash',
  role: 'AI/ML Engineer',
  level: 'Intermediate',
  skills: 'Python, React, Git, Machine Learning, C++',
  projectsRaw: 'AI Career Mentor: CLI tool using a Random Forest classifier to suggest career paths\nSkillBridge AI: Multi-page career platform with resume tools and learning tracking',
  experienceRaw: 'Built and compared regression models for house price prediction\nTuned hyperparameters and evaluated model performance',
  education: 'B.Tech, Computer Engineering — MIT ADT University, Pune (2023–2027)',
  certifications: '',
}

export default function AIResumeGenerator() {
  const [templateId, setTemplateId] = useState('modern-ats')
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [resume, setResume] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [exportingDocx, setExportingDocx] = useState(false)

  function update(key, value) {
    setInputs((s) => ({ ...s, [key]: value }))
  }

  function handleGenerate() {
    setGenerating(true)
    setTimeout(() => {
      const skills = inputs.skills.split(',').map((s) => s.trim()).filter(Boolean)
      const summary = generateSummary({ role: inputs.role, level: inputs.level, skills })
      const experienceBullets = generateExperienceBullets({
        role: inputs.role,
        level: inputs.level,
        experienceRaw: inputs.experienceRaw,
      })
      const projects = generateProjectDescriptions({ projectsRaw: inputs.projectsRaw, skills })
      const achievements = generateAchievements({ level: inputs.level })
      const interests = generateInterests()

      setResume({
        name: inputs.name,
        role: inputs.role,
        summary,
        skills,
        experienceBullets,
        projects,
        education: inputs.education,
        achievements,
        certifications: inputs.certifications,
        interests,
      })
      setGenerating(false)
    }, 900)
  }

  async function handleExportDocx() {
    if (!resume) return
    setExportingDocx(true)
    try {
      const { exportResumeToDocx } = await import('../../utils/docxExport')
      await exportResumeToDocx(resume)
    } finally {
      setExportingDocx(false)
    }
  }

  return (
    <div className="ai-resume">
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <h3 className="ai-resume__block-title">1. Choose a template</h3>
        <TemplateGallery selectedId={templateId} onSelect={setTemplateId} />
      </div>

      <div className="ai-resume__grid">
        <div className="glass-card ai-resume__form">
          <h3 className="ai-resume__block-title">2. Tell us the basics</h3>

          <div className="fp-field">
            <label>Full name</label>
            <input value={inputs.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div className="fp-field">
            <label>Target role</label>
            <input value={inputs.role} onChange={(e) => update('role', e.target.value)} />
          </div>
          <div className="fp-field">
            <label>Experience level</label>
            <select value={inputs.level} onChange={(e) => update('level', e.target.value)}>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="fp-field">
            <label>Skills (comma separated)</label>
            <input value={inputs.skills} onChange={(e) => update('skills', e.target.value)} />
          </div>
          <div className="fp-field">
            <label>Projects (one per line — "Title: short description")</label>
            <textarea
              rows={3}
              value={inputs.projectsRaw}
              onChange={(e) => update('projectsRaw', e.target.value)}
            />
          </div>
          <div className="fp-field">
            <label>Experience (one highlight per line)</label>
            <textarea
              rows={3}
              value={inputs.experienceRaw}
              onChange={(e) => update('experienceRaw', e.target.value)}
            />
          </div>
          <div className="fp-field">
            <label>Education</label>
            <input value={inputs.education} onChange={(e) => update('education', e.target.value)} />
          </div>
          <div className="fp-field">
            <label>Certifications (optional)</label>
            <input value={inputs.certifications} onChange={(e) => update('certifications', e.target.value)} />
          </div>

          <button className="glass-btn" onClick={handleGenerate} disabled={generating} style={{ width: '100%', justifyContent: 'center' }}>
            {generating ? <RefreshCw size={16} className="ai-resume__spin" /> : <Sparkles size={16} />}
            {resume ? 'Regenerate with AI' : 'Generate with AI'}
          </button>

          <p className="fp-note" style={{ marginTop: 14 }}>
            Generation runs as pattern-based text composition in your browser — strong verbs, quantified
            placeholders, and role-aware phrasing — not a call to an external model.
          </p>
        </div>

        <div className="ai-resume__preview-col">
          <div className="ai-resume__preview-actions">
            <button className="glass-btn glass-btn--ghost" onClick={() => window.print()} disabled={!resume}>
              <Download size={15} />
              Export PDF
            </button>
            <button className="glass-btn glass-btn--ghost" onClick={handleExportDocx} disabled={!resume || exportingDocx}>
              <FileDown size={15} />
              {exportingDocx ? 'Preparing…' : 'Export DOCX'}
            </button>
          </div>

          {generating ? (
            <div className="glass-card ai-resume__skeleton">
              <Skeleton height={28} width="60%" style={{ marginBottom: 10 }} />
              <Skeleton height={14} width="40%" style={{ marginBottom: 24 }} />
              <Skeleton height={12} style={{ marginBottom: 8 }} />
              <Skeleton height={12} width="90%" style={{ marginBottom: 8 }} />
              <Skeleton height={12} width="80%" style={{ marginBottom: 24 }} />
              <Skeleton height={12} style={{ marginBottom: 8 }} />
              <Skeleton height={12} width="70%" />
            </div>
          ) : resume ? (
            <ResumeA4Preview templateId={templateId} data={resume} scale={0.72} />
          ) : (
            <div className="glass-card ai-resume__empty">
              <Sparkles size={22} strokeWidth={1.6} />
              <p>Fill in the basics and generate your resume to see a live A4 preview here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
