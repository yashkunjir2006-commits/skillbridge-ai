import { useState } from 'react'
import { LayoutTemplate, Globe, Download } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import { PROJECT_IDEAS } from '../data/mockData'
import './PortfolioBuilder.css'

const THEMES = [
  { id: 'monochrome', name: 'Monochrome', swatch: '#000000' },
  { id: 'slate', name: 'Slate', swatch: '#334155' },
  { id: 'forest', name: 'Forest', swatch: '#166534' },
  { id: 'sunset', name: 'Sunset', swatch: '#c2410c' },
]

export default function PortfolioBuilder() {
  const [theme, setTheme] = useState('monochrome')
  const [included, setIncluded] = useState(new Set(PROJECT_IDEAS.map((p) => p.id)))

  function toggle(id) {
    setIncluded((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Build"
        title="Portfolio Builder"
        description="Turn your projects into a themed, hosted portfolio site."
        actions={
          <>
            <Button variant="secondary" icon={Globe}>
              Preview
            </Button>
            <Button icon={Download} onClick={() => window.print()}>
              Export
            </Button>
          </>
        }
      />

      <div className="fp-grid-2">
        <Card>
          <h3 className="portfolio__section-title">Choose a theme</h3>
          <div className="portfolio__themes">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`portfolio__theme ${theme === t.id ? 'portfolio__theme--active' : ''}`}
                onClick={() => setTheme(t.id)}
              >
                <span className="portfolio__swatch" style={{ background: t.swatch }} />
                {t.name}
              </button>
            ))}
          </div>

          <h3 className="portfolio__section-title" style={{ marginTop: 26 }}>
            Include projects
          </h3>
          <ul>
            {PROJECT_IDEAS.map((p) => (
              <li key={p.id} className="portfolio__project-toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={included.has(p.id)}
                    onChange={() => toggle(p.id)}
                  />
                  {p.title}
                </label>
                <Tag>{p.difficulty}</Tag>
              </li>
            ))}
          </ul>
        </Card>

        <Card className={`portfolio-preview portfolio-preview--${theme}`}>
          <div className="portfolio-preview__icon">
            <LayoutTemplate size={20} strokeWidth={1.6} />
          </div>
          <h2>Yash — AI/ML Engineer</h2>
          <p>Portfolio preview · {included.size} project{included.size === 1 ? '' : 's'} included</p>
          <div className="portfolio-preview__list">
            {PROJECT_IDEAS.filter((p) => included.has(p.id)).map((p) => (
              <div key={p.id} className="portfolio-preview__item">
                {p.title}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
