import { motion } from 'motion/react'
import { videoFadeScale } from '../../animations/variants'
import './HeroVideo.css'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

export default function HeroVideo() {
  return (
    <motion.div
      className="hero-video"
      variants={videoFadeScale}
      initial="hidden"
      animate="visible"
    >
      <video
        className="hero-video__el"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-video__scrim" />
    </motion.div>
  )
}
