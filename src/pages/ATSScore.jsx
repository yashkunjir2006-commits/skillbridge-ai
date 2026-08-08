import { useState } from 'react'
import { ScanSearch } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import ProgressBar from '../components/common/ProgressBar'
import './ATSScore.css'

const STOPWORDS = new Set([
  'the','and','a','an','to','of','in','for','on','with','is','are','as','at','by','be','this','that',
  'or','it','from','will','you','your','our','we','experience','role','team','work','ability','strong',
  'skills','years','including','etc','job','description','responsibilities','requirements','preferred',
])

function extractKeywords(text) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+.#\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    )
  )
}

export default function ATSScore() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [result, setResult] = useState(null)

  function runCheck() {
    if (!resume.trim() || !jd.trim()) return
    const resumeWords = new Set(extractKeywords(resume))
    const jdWords = extractKeywords(jd)

    const matched = jdWords.filter((w) => resumeWords.has(w))
    const missing = jdWords.filter((w) => !resumeWords.has(w))
    const keywordMatch = jdWords.length ? Math.round((matched.length / jdWords.length) * 100) : 0

    const formatting = /\n[-•]/.test('\n' + resume) ? 90 : 65
    const skillsMatch = Math.min(100, keywordMatch + 8)
    const experienceMatch = /\d+\s*(year|yr)/i.test(resume) ? 82 : 58
    const educationMatch = /(b\.?tech|bachelor|degree|university|college)/i.test(resume) ? 88 : 50

    const compatibility = Math.round(
      keywordMatch * 0.4 + formatting * 0.15 + skillsMatch * 0.2 + experienceMatch * 0.15 + educationMatch * 0.1
    )

    setResult({
      keywordMatch,
      formatting,
      skillsMatch,
      experienceMatch,
      educationMatch,
      compatibility,
      matched: matched.slice(0, 18),
      missing: missing.slice(0, 14),
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Career Tools"
        title="ATS Score"
        description="Paste your resume and a job description. This runs a real keyword and formatting comparison right in your browser — no upload needed."
      />

      <div className="fp-grid-2">
        <Card>
          <div className="fp-field">
            <label>Resume text</label>
            <textarea
              rows={12}
              placeholder="Paste your resume content…"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="fp-field">
            <label>Job description</label>
            <textarea
              rows={8}
              placeholder="Paste the job description…"
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>
          <Button icon={ScanSearch} onClick={runCheck}>
            Run ATS Check
          </Button>
        </Card>

        <Card>
          {result ? (
            <>
              <div className="ats-compat">
                <div className="ats-compat__ring">{result.compatibility}%</div>
                <div>
                  <h3>Compatibility</h3>
                  <p>Weighted across keywords, skills, experience, and education</p>
                </div>
              </div>

              <div className="fp-stack">
                <ProgressBar label="Keyword Match" value={result.keywordMatch} />
                <ProgressBar label="Formatting" value={result.formatting} />
                <ProgressBar label="Skills Match" value={result.skillsMatch} />
                <ProgressBar label="Experience Match" value={result.experienceMatch} />
                <ProgressBar label="Education Match" value={result.educationMatch} />
              </div>

              <div className="ats-keywords">
                <div>
                  <h4>Matched keywords</h4>
                  <div className="fp-row">
                    {result.matched.length ? (
                      result.matched.map((w) => (
                        <Tag key={w} tone="success">
                          {w}
                        </Tag>
                      ))
                    ) : (
                      <span className="fp-note">No overlap found yet.</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4>Missing keywords</h4>
                  <div className="fp-row">
                    {result.missing.length ? (
                      result.missing.map((w) => (
                        <Tag key={w} tone="danger">
                          {w}
                        </Tag>
                      ))
                    ) : (
                      <span className="fp-note">Great coverage — nothing major missing.</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="fp-note">Add both a resume and a job description, then run the check.</div>
          )}
        </Card>
      </div>
    </div>
  )
}
