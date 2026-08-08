// Generates polished resume copy from a handful of structured inputs.
// This is template + pattern based (strong verbs, quantified placeholders,
// role-aware phrasing) — not a call to an external model.

const IMPACT_PLACEHOLDERS = ['by 20%', 'across 3 teams', 'in half the time', 'for 500+ users', 'with zero downtime']

const VERB_BY_LEVEL = {
  Fresher: ['Built', 'Designed', 'Developed', 'Implemented', 'Contributed to'],
  Intermediate: ['Led', 'Delivered', 'Optimized', 'Architected', 'Owned'],
  Experienced: ['Spearheaded', 'Scaled', 'Directed', 'Drove', 'Engineered'],
}

function pick(list, seed) {
  return list[seed % list.length]
}

export function generateSummary({ role, level, skills }) {
  const skillList = skills.slice(0, 4).join(', ')
  const levelPhrase =
    level === 'Fresher'
      ? 'early-career'
      : level === 'Experienced'
      ? 'experienced'
      : 'results-driven'

  return `${levelPhrase.charAt(0).toUpperCase() + levelPhrase.slice(1)} ${role} with hands-on experience in ${skillList || 'modern engineering practices'}. Known for shipping reliable, well-tested work and communicating clearly with cross-functional teams. Looking to bring a strong technical foundation and a bias for measurable impact to a ${role.toLowerCase()} role.`
}

export function generateExperienceBullets({ role, level, experienceRaw }) {
  const verbs = VERB_BY_LEVEL[level] || VERB_BY_LEVEL.Intermediate
  const rawLines = experienceRaw
    .split(/\n|;/)
    .map((l) => l.trim())
    .filter(Boolean)

  if (rawLines.length === 0) {
    return [
      `${pick(verbs, 0)} core features end-to-end as a ${role}, collaborating closely with design and product`,
      `${pick(verbs, 1)} performance improvements ${pick(IMPACT_PLACEHOLDERS, 0)} through targeted profiling and refactors`,
      `${pick(verbs, 2)} documentation and onboarding material that reduced ramp-up time for new teammates`,
    ]
  }

  return rawLines.slice(0, 6).map((line, i) => {
    const cleaned = line.replace(/^[-•*]\s*/, '')
    const startsWithVerb = /^[A-Z][a-z]+ed\b|^(Led|Built|Managed|Owned)/.test(cleaned)
    const verb = pick(verbs, i)
    const body = startsWithVerb ? cleaned : `${cleaned}`
    const needsImpact = !/\d/.test(cleaned)
    return startsWithVerb
      ? `${body}${needsImpact ? ` ${pick(IMPACT_PLACEHOLDERS, i)}` : ''}`
      : `${verb} ${body.charAt(0).toLowerCase() + body.slice(1)}${needsImpact ? ` ${pick(IMPACT_PLACEHOLDERS, i)}` : ''}`
  })
}

export function generateProjectDescriptions({ projectsRaw, skills }) {
  const rawEntries = projectsRaw
    .split(/\n{1,}/)
    .map((l) => l.trim())
    .filter(Boolean)

  if (rawEntries.length === 0) return []

  return rawEntries.slice(0, 5).map((entry, i) => {
    const [titlePart, ...rest] = entry.split(/[:\-–]/)
    const title = titlePart.trim() || `Project ${i + 1}`
    const description = rest.join(' ').trim()
    const stack = skills.slice(0, 3).join(', ')
    const verb = pick(['Built', 'Designed', 'Developed', 'Shipped'], i)

    const body = description
      ? `${verb} ${description.charAt(0).toLowerCase() + description.slice(1)}${/\d/.test(description) ? '' : ` — ${pick(IMPACT_PLACEHOLDERS, i)}`}`
      : `${verb} ${title.toLowerCase()} using ${stack || 'a modern stack'}, focused on clean architecture and measurable outcomes`

    return { title, body, stack }
  })
}

export function generateAchievements({ level }) {
  if (level === 'Fresher') {
    return [
      'Ranked in the top percentile of a competitive programming or hackathon event',
      'Maintained a strong academic record while contributing to open-source or side projects',
    ]
  }
  return [
    'Recognized for delivering a high-impact project ahead of schedule',
    'Mentored junior engineers, improving team ramp-up time',
  ]
}

export function generateInterests() {
  return ['Open-source contribution', 'System design', 'Competitive programming']
}
