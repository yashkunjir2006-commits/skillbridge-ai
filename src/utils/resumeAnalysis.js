// Comprehensive, transparent heuristic resume analysis.
// Everything here is computed from the extracted text in the browser —
// no external AI call. Scores are estimates based on structure and keywords,
// not a visual read of margins/fonts (a plain-text extraction can't see those).

import { detectSkills, roleFit, bestMatchingRoles, ROLE_PROFILES } from '../data/skillLibrary'

const ACTION_VERBS = [
  'led', 'built', 'designed', 'improved', 'launched', 'optimized', 'reduced',
  'automated', 'scaled', 'shipped', 'developed', 'implemented', 'created',
  'architected', 'delivered', 'increased', 'decreased', 'migrated', 'streamlined',
  'mentored', 'spearheaded', 'engineered',
]

const WEAK_PHRASES = [
  { pattern: /\bworked on\b/gi, replacement: 'developed', example: 'Worked on the login page → Developed the login page, cutting auth errors by 18%' },
  { pattern: /\bhelped (with|to)?\b/gi, replacement: 'contributed to', example: 'Helped with testing → Contributed to a test suite that caught 30+ regressions' },
  { pattern: /\bresponsible for\b/gi, replacement: 'owned', example: 'Responsible for deployments → Owned weekly production deployments' },
  { pattern: /\bin charge of\b/gi, replacement: 'led', example: 'In charge of the team → Led a 4-person engineering team' },
  { pattern: /\bdid\b/gi, replacement: 'executed', example: 'Did data cleanup → Executed a data cleanup pipeline processing 1M+ rows' },
  { pattern: /\bmade\b/gi, replacement: 'built', example: 'Made a dashboard → Built a dashboard used by 200+ weekly users' },
]

const SECTION_HEADERS = {
  summary: /(summary|objective|profile)/i,
  skills: /(skills|technical skills|technologies)/i,
  experience: /(experience|work experience|employment)/i,
  projects: /(projects|personal projects|academic projects)/i,
  education: /(education|academic background)/i,
  certifications: /(certifications?|licenses)/i,
}

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
}

function findSectionBlocks(text) {
  const lines = splitLines(text)
  const blocks = {}
  let current = null

  for (const line of lines) {
    const short = line.length < 40
    let matchedKey = null
    if (short) {
      for (const [key, regex] of Object.entries(SECTION_HEADERS)) {
        if (regex.test(line)) {
          matchedKey = key
          break
        }
      }
    }
    if (matchedKey) {
      current = matchedKey
      blocks[current] = blocks[current] || []
      continue
    }
    if (current) {
      blocks[current] = blocks[current] || []
      blocks[current].push(line)
    }
  }
  return blocks
}

function countBullets(text) {
  return (text.match(/(^|\n)\s*[-•*]/g) || []).length
}

function countNumbers(text) {
  return (text.match(/\b\d+(\.\d+)?%?\+?\b/g) || []).length
}

function countActionVerbStarts(lines) {
  return lines.filter((l) => {
    const first = l.replace(/^[-•*]\s*/, '').split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '')
    return ACTION_VERBS.includes(first)
  }).length
}

function analyzeFormatting(text, blocks) {
  const bulletCount = countBullets(text)
  const sectionsFound = Object.keys(blocks).length
  const expectedOrder = ['summary', 'skills', 'experience', 'projects', 'education']
  const foundOrder = expectedOrder.filter((k) => blocks[k])
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  let score = 40
  score += Math.min(20, bulletCount * 2)
  score += Math.min(20, sectionsFound * 5)
  score += foundOrder.length >= 3 ? 15 : 5
  if (wordCount > 150 && wordCount < 900) score += 5
  score = Math.min(96, score)

  return {
    score,
    bulletCount,
    sectionsFound,
    sectionOrder: foundOrder,
    wordCount,
    note: 'Estimated from document structure (bullets, sections, length) — a plain-text read can\'t evaluate visual margins or font choices directly.',
  }
}

function analyzeExperience(blocks) {
  const lines = blocks.experience || []
  const text = lines.join(' ')
  const bulletLines = lines.filter((l) => /^[-•*]/.test(l))
  const impactCount = countNumbers(text)
  const verbCount = countActionVerbStarts(bulletLines.length ? bulletLines : lines)

  const impact = Math.min(100, 30 + impactCount * 12)
  const actionVerbs = Math.min(100, 20 + verbCount * 18)
  const metrics = impactCount > 0 ? Math.min(100, 40 + impactCount * 10) : 15
  const responsibilities = Math.min(100, (bulletLines.length || lines.length) * 15)

  return {
    found: lines.length > 0,
    impact,
    actionVerbs,
    metrics,
    responsibilities,
    bulletCount: bulletLines.length,
  }
}

function analyzeEducation(blocks, fullText) {
  const text = (blocks.education || []).join(' ') || fullText
  const degree = /(b\.?\s?tech|bachelor|b\.?\s?e\b|m\.?\s?tech|master|b\.?\s?sc|m\.?\s?sc|mba|phd)/i.test(text)
  const cgpaMatch = text.match(/\b(?:cgpa|gpa)\s*[:-]?\s*(\d\.\d{1,2})/i)
  const yearMatch = text.match(/\b(19|20)\d{2}\b/)
  const coursework = /(coursework|relevant courses|courses)/i.test(text)

  return {
    degreeFound: degree,
    cgpa: cgpaMatch ? cgpaMatch[1] : null,
    graduationYear: yearMatch ? yearMatch[0] : null,
    courseworkListed: coursework,
  }
}

function splitProjects(blocks) {
  const lines = blocks.projects || []
  if (!lines.length) return []

  const entries = []
  let current = null

  for (const line of lines) {
    const isTitleLike = !/^[-•*]/.test(line) && line.length < 70 && !/[.]$/.test(line)
    if (isTitleLike) {
      if (current) entries.push(current)
      current = { title: line.replace(/[|,]\s*(20\d{2}|present).*/i, '').trim(), lines: [] }
    } else if (current) {
      current.lines.push(line)
    }
  }
  if (current) entries.push(current)
  return entries.slice(0, 6)
}

function scoreProject(entry, detectedSkills) {
  const text = entry.lines.join(' ')
  const hasMetrics = countNumbers(text) > 0
  const techMentioned = detectedSkills.filter((s) => text.toLowerCase().includes(s))
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const hasVerb = countActionVerbStarts(entry.lines) > 0

  let score = 50
  if (hasMetrics) score += 18
  if (techMentioned.length) score += Math.min(16, techMentioned.length * 4)
  if (wordCount > 12) score += 10
  if (hasVerb) score += 6
  score = Math.min(98, score)

  const strengths = []
  const weaknesses = []
  const suggestions = []

  if (hasMetrics) strengths.push('Includes a measurable outcome')
  else {
    weaknesses.push('No measurable outcome or metric')
    suggestions.push('Add a number — users, latency, accuracy, or time saved')
  }

  if (techMentioned.length) strengths.push(`Clear tech stack (${techMentioned.slice(0, 3).join(', ')})`)
  else {
    weaknesses.push('Tech stack not obviously named')
    suggestions.push('Name the core technologies used, not just "the project"')
  }

  if (hasVerb) strengths.push('Starts with a strong action verb')
  else suggestions.push('Start the first line with a verb like "Built", "Designed", or "Automated"')

  if (wordCount < 12) weaknesses.push('Description is quite short')

  return {
    title: entry.title || 'Untitled project',
    score,
    strengths,
    weaknesses,
    suggestions,
    missingMetrics: !hasMetrics,
    complexity: wordCount > 30 ? 'High' : wordCount > 15 ? 'Medium' : 'Low',
    recruiterImpression:
      score >= 80 ? 'Reads as a strong, credible project' : score >= 60 ? 'Solid, but could be sharper' : 'Needs more specificity to stand out',
  }
}

function analyzeGrammar(text) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  const longSentences = sentences.filter((s) => s.split(/\s+/).length > 30)
  const passiveMatches = text.match(/\b(is|are|was|were|been|being)\s+\w+ed\b/gi) || []

  return {
    longSentenceCount: longSentences.length,
    longSentenceExamples: longSentences.slice(0, 2),
    passiveVoiceCount: passiveMatches.length,
    passiveExamples: [...new Set(passiveMatches)].slice(0, 4),
  }
}

function findWeakPhraseSuggestions(text) {
  const found = []
  for (const wp of WEAK_PHRASES) {
    if (wp.pattern.test(text)) {
      found.push(wp)
    }
    wp.pattern.lastIndex = 0
  }
  return found
}

function keywordMatch(detectedSkills, targetRole) {
  const profile = ROLE_PROFILES[targetRole]
  if (!profile) return []
  return profile.keywords.map((k) => ({
    keyword: k,
    match: detectedSkills.includes(k) ? 100 : 0,
  }))
}

export function analyzeResume(text, targetRole = 'Software Engineer') {
  const blocks = findSectionBlocks(text)
  const detected = detectSkills(text)
  const fit = roleFit(detected, targetRole)
  const formatting = analyzeFormatting(text, blocks)
  const experience = analyzeExperience(blocks)
  const education = analyzeEducation(blocks, text)
  const projects = splitProjects(blocks).map((p) => scoreProject(p, detected))
  const grammar = analyzeGrammar(text)
  const suggestions = findWeakPhraseSuggestions(text)
  const keywords = keywordMatch(detected, targetRole)
  const recommendedRoles = bestMatchingRoles(detected)

  const keywordScore = keywords.length
    ? Math.round((keywords.filter((k) => k.match === 100).length / keywords.length) * 100)
    : 50

  const experienceScore = experience.found
    ? Math.round((experience.impact + experience.actionVerbs + experience.metrics + experience.responsibilities) / 4)
    : 30

  const overall = Math.round(
    keywordScore * 0.32 +
      formatting.score * 0.2 +
      experienceScore * 0.23 +
      fit.fit * 0.15 +
      (education.degreeFound ? 90 : 55) * 0.1
  )

  const interviewReadiness = Math.round(
    (experienceScore * 0.4 + fit.fit * 0.35 + (projects.length ? projects.reduce((a, p) => a + p.score, 0) / projects.length : 55) * 0.25)
  )

  let recruiterFeedback
  if (overall >= 85) recruiterFeedback = 'This resume reads as strong and credible — clear impact, relevant keywords, and solid structure.'
  else if (overall >= 70) recruiterFeedback = 'A solid resume overall. A few targeted fixes below would push it into the top tier.'
  else if (overall >= 50) recruiterFeedback = 'This resume has a foundation to build on, but is currently missing keywords and measurable impact that recruiters and ATS systems look for.'
  else recruiterFeedback = 'This resume needs significant work on structure, keywords, and measurable outcomes before it will perform well with ATS systems or recruiters.'

  return {
    targetRole,
    overall,
    keywordScore,
    formatting,
    experience,
    experienceScore,
    education,
    projects,
    grammar,
    suggestions,
    keywords,
    detectedSkills: detected,
    missingSkills: fit.missing,
    fit,
    recommendedRoles,
    interviewReadiness,
    recruiterFeedback,
    wordCount: formatting.wordCount,
  }
}
