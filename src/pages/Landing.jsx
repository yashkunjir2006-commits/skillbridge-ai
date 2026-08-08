import Navbar from '../components/landing/Navbar'
import HeroVideo from '../components/landing/HeroVideo'
import FooterHero from '../components/landing/FooterHero'
import FeaturesSection from '../components/landing/FeaturesSection'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <section className="landing__hero">
        <HeroVideo />
        <FooterHero />
      </section>
      <FeaturesSection />
    </div>
  )
}
