import { useState } from 'react'
import { Sparkles, ArrowDown } from 'lucide-react'
import DropZone from '../resume/DropZone'
import Skeleton from '../common/Skeleton'
import { ROLE_PROFILES, detectSkills, roleFit } from '../../data/skillLibrary'
import './AIRoadmapGenerator.css'

function buildWeeklyPlan(missingSkills, targetRole) {
  const weeks = missingSkills.slice(0, 3).map((skill, i) => ({
    week: i + 1,
    focus: skill,
    detail: `Study fundamentals, then build one small exercise using ${skill}.`,
  }))

  weeks.push({
    week: weeks.length + 1,
    focus: `Portfolio project for ${targetRole}`,
    detail: `Combine what you've learned into one project you can talk about in an interview.`,
  })

  return weeks
}

export default function AIRoadmapGenerator() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [targetRole, setTargetRole] = useState('Software Engineer')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function handleFile(f, err) {
    setFile(f)
    setError(err)
    setResult(null)
  }

  async function handleGenerate() {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const { extractResumeText } = await import('../../utils/resumeParser')
      const { text } = await extractResumeText(file)
      const detected = detectSkills(text)
      const fit = roleFit(detected, targetRole)
      const plan = buildWeeklyPlan(fit.missing, targetRole)
      setResult({ detected, missing: fit.missing, plan })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card ai-roadmap">
      <div className="ai-roadmap__intro">
        <span className="glass-pill">
          <Sparkles size={12} />
          AI Learning Recommendation
        </span>
        <h3>Upload your resume, get a personalized roadmap</h3>
        <p>SkillBridge AI finds the skills missing for your target role and builds a week-by-week plan to close the gap.</p>
      </div>

      <div className="ai-roadmap__controls">
        <div className="ai-roadmap__upload">
          <DropZone file={file} onFile={handleFile} onClear={() => handleFile(null, null)} error={error} />
        </div>
        <div className="ai-roadmap__role">
          <label>Target role</label>
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            {Object.keys(ROLE_PROFILES).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button className="glass-btn" onClick={handleGenerate} disabled={!file || loading} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
            <Sparkles size={15} />
            {loading ? 'Analyzing…' : 'Generate Roadmap'}
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: 22 }}>
          <Skeleton height={14} width="40%" style={{ marginBottom: 10 }} />
          <Skeleton height={60} style={{ marginBottom: 10 }} />
          <Skeleton height={60} width="90%" />
        </div>
      )}

      {result && !loading && (
        <div className="ai-roadmap__result">
          <div className="ai-roadmap__missing">
            <span>Missing skills for {targetRole}</span>
            <div className="fp-row">
              {result.missing.length ? (
                result.missing.map((s) => <span key={s} className="ai-roadmap__missing-chip">{s}</span>)
              ) : (
                <span className="fp-note">Great coverage — no major gaps found.</span>
              )}
            </div>
          </div>

          {result.plan.length > 0 && (
            <div className="ai-roadmap__timeline">
              {result.plan.map((w, i) => (
                <div key={w.week} className="ai-roadmap__week">
                  <div className="ai-roadmap__week-card glass-card glass-card--tight">
                    <span className="ai-roadmap__week-num">Week {w.week}</span>
                    <h4>{w.focus}</h4>
                    <p>{w.detail}</p>
                  </div>
                  {i < result.plan.length - 1 && <ArrowDown size={16} className="ai-roadmap__arrow" />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
