import { Award } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Tag from '../components/common/Tag'
import ProgressBar from '../components/common/ProgressBar'
import { CERTIFICATIONS } from '../data/mockData'
import './CertificationTracker.css'

const STATUS_TONE = {
  Completed: 'success',
  'In progress': 'warning',
  'Not started': 'neutral',
}

export default function CertificationTracker() {
  return (
    <div>
      <PageHeader
        eyebrow="Build"
        title="Certification Tracker"
        description="Track progress and expiry across major providers — Google, Microsoft, AWS, Oracle, Cisco, Coursera."
      />

      <div className="fp-stack">
        {CERTIFICATIONS.map((cert) => (
          <Card key={cert.id} className="cert-card">
            <div className="cert-card__icon">
              <Award size={18} strokeWidth={1.8} />
            </div>
            <div className="cert-card__info">
              <div className="cert-card__title-row">
                <h3>{cert.name}</h3>
                <Tag tone={STATUS_TONE[cert.status]}>{cert.status}</Tag>
              </div>
              <p>{cert.provider} · Expiry: {cert.expiry}</p>
              <ProgressBar value={cert.progress} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
