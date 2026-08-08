import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  footerSlideUp,
  subtitleSlideUp,
  headingSlideUp,
  buttonsSlideUp,
  tagsSlideUp,
} from '../../animations/variants'
import './FooterHero.css'

const TAGS = ['Resume AI', 'Mock Interview', 'Career Roadmap', 'ATS Optimizer', 'Learning Hub']

export default function FooterHero() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="footer-hero"
      variants={footerSlideUp}
      initial="hidden"
      animate="visible"
    >
      <div className="footer-hero__inner">
        <div className="footer-hero__left">
          <motion.div
            className="footer-hero__subtitle"
            variants={subtitleSlideUp}
            initial="hidden"
            animate="visible"
          >
            <span className="footer-hero__dot" />
            AI Powered Career Platform
          </motion.div>

          <motion.h1
            className="footer-hero__heading"
            variants={headingSlideUp}
            initial="hidden"
            animate="visible"
          >
            Land Your Dream Job.
            <br />
            Smarter. Faster.
            <br />
            With AI.
          </motion.h1>

          <motion.div
            className="footer-hero__buttons"
            variants={buttonsSlideUp}
            initial="hidden"
            animate="visible"
          >
            <button
              type="button"
              className="footer-hero__btn footer-hero__btn--primary"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
              <ArrowRight size={16} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              className="footer-hero__btn footer-hero__btn--secondary"
              onClick={() => {
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Sparkles size={16} strokeWidth={2.25} />
              Explore Features
            </button>
          </motion.div>
        </div>

        <div className="footer-hero__right">
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              className="footer-hero__tag"
              variants={tagsSlideUp}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
