import { useState } from 'react'
import { Sparkles, ScanSearch } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import AIResumeGenerator from '../components/resume/AIResumeGenerator'
import ResumeAnalyzerPanel from '../components/resume/ResumeAnalyzerPanel'

export default function ResumeBuilder() {
  const [tab, setTab] = useState('generate')

  return (
    <div className="glass-scope">
      <PageHeader
        eyebrow="Career Tools"
        title="AI Resume Generator"
        description="Generate a polished, ATS-friendly resume from a few inputs, or upload an existing one for a full recruiter-style breakdown."
      />

      <div className="glass-tabs">
        <button
          className={`glass-tab ${tab === 'generate' ? 'glass-tab--active' : ''}`}
          onClick={() => setTab('generate')}
        >
          <Sparkles size={14} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }} />
          AI Generator
        </button>
        <button
          className={`glass-tab ${tab === 'analyze' ? 'glass-tab--active' : ''}`}
          onClick={() => setTab('analyze')}
        >
          <ScanSearch size={14} style={{ display: 'inline', marginRight: 6, marginBottom: -2 }} />
          Analyze
        </button>
      </div>

      {tab === 'generate' ? <AIResumeGenerator /> : <ResumeAnalyzerPanel />}
    </div>
  )
}
