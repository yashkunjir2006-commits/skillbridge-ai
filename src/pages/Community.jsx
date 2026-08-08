import { Users, MessagesSquare, Code2, Trophy } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Tag from '../components/common/Tag'
import { COMMUNITY_GROUPS } from '../data/mockData'
import './Community.css'

const TAG_ICON = {
  'Study Group': Users,
  'Coding Room': Code2,
  Experiences: MessagesSquare,
}

export default function Community() {
  return (
    <div>
      <PageHeader
        eyebrow="More"
        title="Community"
        description="Study groups, coding rooms, interview experiences, and hackathons — all in one place."
      />

      <div className="fp-grid-2" style={{ marginBottom: 24 }}>
        {COMMUNITY_GROUPS.map((g) => {
          const Icon = TAG_ICON[g.tag] || Users
          return (
            <Card key={g.id} hover className="community-card">
              <div className="community-card__icon">
                <Icon size={17} strokeWidth={1.8} />
              </div>
              <div className="community-card__info">
                <h3>{g.title}</h3>
                <p>{g.members.toLocaleString()} members</p>
              </div>
              <Tag>{g.tag}</Tag>
            </Card>
          )
        })}
      </div>

      <Card className="community-cta">
        <Trophy size={20} strokeWidth={1.7} />
        <div className="community-cta__text">
          <h3>Autumn Hackathon 2026</h3>
          <p>Team up with the community and build something in 48 hours.</p>
        </div>
        <Button>Join Hackathon</Button>
      </Card>
    </div>
  )
}
