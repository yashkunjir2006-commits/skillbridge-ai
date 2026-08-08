import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FEATURES } from '../../data/features'
import { staggerContainer, staggerItem, fadeIn } from '../../animations/variants'
import './FeaturesSection.css'

export default function FeaturesSection() {
  const navigate = useNavigate()

  return (
    <section id="features" className="features">
      <div className="container">
        <motion.div
          className="features__header"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="features__eyebrow">Everything in one platform</span>
          <h2 className="features__title">Every stage of the job search, covered.</h2>
        </motion.div>

        <motion.div
          className="features__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.button
                type="button"
                key={feature.id}
                className="feature-card"
                variants={staggerItem}
                onClick={() => navigate(feature.to)}
              >
                <span className="feature-card__icon">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="feature-card__title-row">
                  <span className="feature-card__title">{feature.title}</span>
                  <ArrowUpRight size={16} className="feature-card__arrow" />
                </span>
                <span className="feature-card__desc">{feature.description}</span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
