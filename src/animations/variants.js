// Shared Motion variants for the landing experience.
// Easing + timings kept consistent across navbar, video, and footer content.

export const EASE = [0.16, 1, 0.3, 1]

export const navbarSlideDown = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const videoFadeScale = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE },
  },
}

export const footerSlideUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
}

export const subtitleSlideUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.15 },
  },
}

export const headingSlideUp = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.3 },
  },
}

export const buttonsSlideUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.45 },
  },
}

export const tagsSlideUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay: 0.55 + i * 0.06 },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
}
