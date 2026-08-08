// Master skill vocabulary + target-role profiles used for keyword matching,
// missing-skill detection, and job-role recommendations.

export const SKILL_LIBRARY = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c', 'go', 'rust',
  'react', 'react.js', 'vue', 'angular', 'next.js', 'node', 'node.js', 'express',
  'html', 'css', 'tailwind', 'redux', 'graphql', 'rest api', 'websockets',
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'firebase',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'jenkins',
  'git', 'github', 'linux', 'bash',
  'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'scikit-learn',
  'pandas', 'numpy', 'nlp', 'computer vision', 'data analysis', 'data visualization',
  'statistics', 'tableau', 'power bi', 'excel',
  'agile', 'scrum', 'system design', 'microservices', 'unit testing', 'jest',
]

export const ROLE_PROFILES = {
  'Software Engineer': {
    keywords: ['javascript', 'python', 'git', 'sql', 'rest api', 'system design', 'unit testing', 'ci/cd'],
    salary: '₹8–18 LPA',
  },
  'Frontend Developer': {
    keywords: ['react', 'javascript', 'typescript', 'css', 'html', 'redux', 'git', 'tailwind'],
    salary: '₹6–15 LPA',
  },
  'Backend Developer': {
    keywords: ['node.js', 'sql', 'rest api', 'docker', 'aws', 'mongodb', 'microservices', 'git'],
    salary: '₹7–16 LPA',
  },
  'Data Scientist': {
    keywords: ['python', 'machine learning', 'statistics', 'pandas', 'numpy', 'sql', 'data visualization', 'scikit-learn'],
    salary: '₹9–20 LPA',
  },
  'ML Engineer': {
    keywords: ['python', 'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'docker', 'aws', 'git'],
    salary: '₹10–22 LPA',
  },
  'Cloud/DevOps Engineer': {
    keywords: ['aws', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'linux', 'bash', 'jenkins'],
    salary: '₹7–17 LPA',
  },
}

export function detectSkills(text) {
  const lower = text.toLowerCase()
  return SKILL_LIBRARY.filter((skill) => lower.includes(skill))
}

export function roleFit(detectedSkills, roleName) {
  const profile = ROLE_PROFILES[roleName]
  if (!profile) return { have: [], missing: [], fit: 0 }
  const have = profile.keywords.filter((k) => detectedSkills.includes(k))
  const missing = profile.keywords.filter((k) => !detectedSkills.includes(k))
  const fit = Math.round((have.length / profile.keywords.length) * 100)
  return { have, missing, fit, salary: profile.salary }
}

export function bestMatchingRoles(detectedSkills, limit = 3) {
  return Object.keys(ROLE_PROFILES)
    .map((role) => ({ role, ...roleFit(detectedSkills, role) }))
    .sort((a, b) => b.fit - a.fit)
    .slice(0, limit)
}
