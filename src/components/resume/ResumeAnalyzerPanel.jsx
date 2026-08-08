import { useState } from 'react'
import {
  ScanSearch, Download, Mail, AlertTriangle, CheckCircle2, XCircle,
  Sparkles, Briefcase, GraduationCap,
} from 'lucide-react'
import DropZone from './DropZone'
import GlassRing from './GlassRing'
import Skeleton from '../common/Skeleton'
import Tag from '../common/Tag'
import { ROLE_PROFILES } from '../../data/skillLibrary'
import './ResumeAnalyzerPanel.css'

function downloadText(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ResumeAnalyzerPanel() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [targetRole, setTargetRole] = useState('Software Engineer')
  const [extractedText, setExtractedText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [warnings, setWarnings] = useState([])

  function handleFile(f, err) {
    setError(err)
    setFile(f)
    setAnalysis(null)
    setExtractedText('')
  }

  function handleClear() {
    setFile(null)
    setAnalysis(null)
    setError(null)
    setExtractedText('')
  }

  async function handleAnalyze() {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const { extractResumeText } = await import('../../utils/resumeParser')
      const { analyzeResume } = await import('../../utils/resumeAnalysis')
      const { text, warnings: w } = await extractResumeText(file)
      setExtractedText(text)
      setWarnings(w)
      const result = analyzeResume(text, targetRole)
      setAnalysis(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function downloadReport() {
    if (!analysis) return
    const lines = [
      `SkillBridge AI — ATS Report`,
      `Target role: ${analysis.targetRole}`,
      ``,
      `Overall ATS Score: ${analysis.overall}/100`,
      `Keyword Match: ${analysis.keywordScore}%`,
      `Formatting Score: ${analysis.formatting.score}/100`,
      `Interview Readiness: ${analysis.interviewReadiness}%`,
      ``,
      `Recruiter Feedback:`,
      analysis.recruiterFeedback,
      ``,
      `Detected Skills: ${analysis.detectedSkills.join(', ') || 'None detected'}`,
      `Missing Skills for ${analysis.targetRole}: ${analysis.missingSkills.join(', ') || 'None'}`,
      ``,
      `Keyword Match Breakdown:`,
      ...analysis.keywords.map((k) => `  - ${k.keyword}: ${k.match}%`),
      ``,
      `Suggestions:`,
      ...analysis.suggestions.map((s) => `  - ${s.example}`),
    ]
    downloadText('SkillBridge_ATS_Report.txt', lines.join('\n'))
  }

  function downloadCoverLetter() {
    if (!analysis) return
    const nameMatch = extractedText.match(/^[A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+){0,2}/m)
    const name = nameMatch ? nameMatch[0] : 'Candidate'
    const topSkills = analysis.detectedSkills.slice(0, 4).join(', ') || 'a strong technical foundation'
    const letter = `Dear Hiring Manager,

I'm excited to apply for the ${analysis.targetRole} position. My background includes hands-on experience with ${topSkills}, and I've focused on building work that ships, not just work that demos well.

${analysis.recruiterFeedback}

I'd welcome the chance to talk through how my experience lines up with what your team is building.

Best regards,
${name}`
    downloadText('SkillBridge_Cover_Letter.txt', letter)
  }

  function downloadImprovedResume() {
    if (!analysis) return
    let improved = extractedText
    for (const s of analysis.suggestions) {
      improved = improved.replace(s.pattern, s.replacement)
    }
    downloadText('SkillBridge_Improved_Resume.txt', improved)
  }

  return (
    <div className="resume-analyzer">
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <div className="resume-analyzer__upload-row">
          <div className="resume-analyzer__upload-col">
            <h3 className="ai-resume__block-title">Upload your resume</h3>
            <DropZone file={file} onFile={handleFile} onClear={handleClear} error={error} />
          </div>
          <div className="resume-analyzer__role-col">
            <h3 className="ai-resume__block-title">Target role</h3>
            <select
              className="resume-analyzer__role-select"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              {Object.keys(ROLE_PROFILES).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              className="glass-btn"
              onClick={handleAnalyze}
              disabled={!file || loading}
              style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
            >
              <ScanSearch size={16} />
              {loading ? 'Analyzing…' : 'Analyze Resume'}
            </button>
            <p className="fp-note" style={{ marginTop: 12 }}>
              Text is extracted and analyzed entirely in your browser — nothing is uploaded to a server.
            </p>
          </div>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="resume-analyzer__warning">
          <AlertTriangle size={14} />
          {warnings[0]}
        </div>
      )}

      {loading && (
        <div className="glass-card">
          <Skeleton height={84} width={84} radius={999} style={{ marginBottom: 20 }} />
          <Skeleton height={12} style={{ marginBottom: 10 }} />
          <Skeleton height={12} width="80%" style={{ marginBottom: 10 }} />
          <Skeleton height={12} width="60%" />
        </div>
      )}

      {analysis && !loading && (
        <div className="resume-analyzer__results">
          <div className="glass-card resume-analyzer__hero">
            <GlassRing value={analysis.overall} size={96} />
            <div className="resume-analyzer__hero-text">
              <span className="glass-pill">
                <Sparkles size={12} />
                Overall ATS Score
              </span>
              <h2>{analysis.overall}/100 for {analysis.targetRole}</h2>
              <p>{analysis.recruiterFeedback}</p>
            </div>
            <div className="resume-analyzer__hero-actions">
              <button className="glass-btn glass-btn--ghost" onClick={downloadReport}>
                <Download size={14} />
                ATS Report
              </button>
              <button className="glass-btn glass-btn--ghost" onClick={downloadImprovedResume}>
                <Download size={14} />
                Improved Resume
              </button>
              <button className="glass-btn glass-btn--ghost" onClick={downloadCoverLetter}>
                <Mail size={14} />
                Cover Letter
              </button>
            </div>
          </div>

          <div className="resume-analyzer__grid">
            <div className="glass-card">
              <h3 className="ai-resume__block-title">Formatting</h3>
              <ScoreBar label="Structure score" value={analysis.formatting.score} />
              <ul className="resume-analyzer__meta-list">
                <li>Bullet points found: {analysis.formatting.bulletCount}</li>
                <li>Sections detected: {analysis.formatting.sectionsFound}</li>
                <li>Word count: {analysis.formatting.wordCount}</li>
              </ul>
              <p className="fp-note">{analysis.formatting.note}</p>
            </div>

            <div className="glass-card">
              <h3 className="ai-resume__block-title">Skills</h3>
              <div className="resume-analyzer__skill-block">
                <span>Detected</span>
                <div className="fp-row">
                  {analysis.detectedSkills.length ? (
                    analysis.detectedSkills.slice(0, 12).map((s) => (
                      <Tag key={s} tone="success">
                        {s}
                      </Tag>
                    ))
                  ) : (
                    <span className="fp-note">None confidently detected</span>
                  )}
                </div>
              </div>
              <div className="resume-analyzer__skill-block">
                <span>Missing for {analysis.targetRole}</span>
                <div className="fp-row">
                  {analysis.missingSkills.length ? (
                    analysis.missingSkills.map((s) => (
                      <Tag key={s} tone="danger">
                        {s}
                      </Tag>
                    ))
                  ) : (
                    <span className="fp-note">Full coverage</span>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h3 className="ai-resume__block-title">Experience</h3>
              <ScoreBar label="Impact" value={analysis.experience.impact} />
              <ScoreBar label="Action verbs" value={analysis.experience.actionVerbs} />
              <ScoreBar label="Metrics used" value={analysis.experience.metrics} />
              <ScoreBar label="Responsibilities clarity" value={analysis.experience.responsibilities} />
            </div>

            <div className="glass-card">
              <h3 className="ai-resume__block-title">
                <GraduationCap size={15} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }} />
                Education
              </h3>
              <ul className="resume-analyzer__check-list">
                <CheckRow ok={analysis.education.degreeFound} label="Degree clearly stated" />
                <CheckRow ok={!!analysis.education.cgpa} label={`CGPA / GPA ${analysis.education.cgpa ? `(${analysis.education.cgpa})` : 'not found'}`} />
                <CheckRow ok={!!analysis.education.graduationYear} label={`Graduation year ${analysis.education.graduationYear ? `(${analysis.education.graduationYear})` : 'not found'}`} />
                <CheckRow ok={analysis.education.courseworkListed} label="Relevant coursework listed" />
              </ul>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: 16 }}>
            <h3 className="ai-resume__block-title">Keyword Match</h3>
            <div className="resume-analyzer__keywords">
              {analysis.keywords.map((k) => (
                <div key={k.keyword} className="resume-analyzer__keyword-row">
                  <span>{k.keyword}</span>
                  <div className="glass-progress" style={{ flex: 1 }}>
                    <div className="glass-progress__fill" style={{ width: `${k.match}%` }} />
                  </div>
                  <span className="resume-analyzer__keyword-pct">{k.match}%</span>
                </div>
              ))}
            </div>
          </div>

          {analysis.projects.length > 0 && (
            <div className="glass-card" style={{ marginTop: 16 }}>
              <h3 className="ai-resume__block-title">Project-by-Project Evaluation</h3>
              <div className="resume-analyzer__projects">
                {analysis.projects.map((p, i) => (
                  <div className="resume-analyzer__project-card" key={i}>
                    <div className="resume-analyzer__project-top">
                      <h4>{p.title}</h4>
                      <GlassRing value={p.score} size={48} />
                    </div>
                    <div className="resume-analyzer__project-meta">
                      <Tag tone={p.complexity === 'High' ? 'dark' : 'neutral'}>{p.complexity} complexity</Tag>
                      <Tag tone={p.missingMetrics ? 'warning' : 'success'}>
                        {p.missingMetrics ? 'Missing metrics' : 'Has metrics'}
                      </Tag>
                    </div>
                    <p className="resume-analyzer__project-impression">{p.recruiterImpression}</p>
                    {p.strengths.length > 0 && (
                      <div className="resume-analyzer__project-list resume-analyzer__project-list--good">
                        {p.strengths.map((s) => (
                          <span key={s}>
                            <CheckCircle2 size={12} /> {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.weaknesses.length > 0 && (
                      <div className="resume-analyzer__project-list resume-analyzer__project-list--bad">
                        {p.weaknesses.map((s) => (
                          <span key={s}>
                            <XCircle size={12} /> {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.suggestions.length > 0 && (
                      <p className="resume-analyzer__project-suggestion">💡 {p.suggestions[0]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="resume-analyzer__grid" style={{ marginTop: 16 }}>
            <div className="glass-card">
              <h3 className="ai-resume__block-title">Grammar</h3>
              <ul className="resume-analyzer__meta-list">
                <li>Passive voice instances: {analysis.grammar.passiveVoiceCount}</li>
                <li>Long sentences (30+ words): {analysis.grammar.longSentenceCount}</li>
              </ul>
              {analysis.grammar.passiveExamples.length > 0 && (
                <div className="resume-analyzer__grammar-examples">
                  {analysis.grammar.passiveExamples.map((e) => (
                    <span key={e}>{e}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card">
              <h3 className="ai-resume__block-title">AI Suggestions</h3>
              {analysis.suggestions.length ? (
                <div className="resume-analyzer__suggestions">
                  {analysis.suggestions.map((s, i) => (
                    <p key={i}>{s.example}</p>
                  ))}
                </div>
              ) : (
                <p className="fp-note">No weak phrasing detected — nice work.</p>
              )}
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: 16 }}>
            <h3 className="ai-resume__block-title">
              <Briefcase size={15} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }} />
              Interview Readiness & Recommended Roles
            </h3>
            <ScoreBar label="Interview readiness" value={analysis.interviewReadiness} />
            <div className="resume-analyzer__roles">
              {analysis.recommendedRoles.map((r) => (
                <div key={r.role} className="resume-analyzer__role-card">
                  <span>{r.role}</span>
                  <strong>{r.fit}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div className="resume-analyzer__score-bar">
      <div className="resume-analyzer__score-bar-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="glass-progress">
        <div className="glass-progress__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function CheckRow({ ok, label }) {
  return (
    <li className={ok ? 'resume-analyzer__check--ok' : 'resume-analyzer__check--no'}>
      {ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
      {label}
    </li>
  )
}
