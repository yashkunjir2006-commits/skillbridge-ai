export const RESUME_TEMPLATES = [
  { id: 'modern-ats', name: 'Modern ATS', accent: '#4f46e5', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'left' },
  { id: 'google-style', name: 'Google Style', accent: '#1a73e8', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'left' },
  { id: 'microsoft-style', name: 'Microsoft Style', accent: '#0f6cbd', font: "'Inter', sans-serif", layout: 'sidebar', headerStyle: 'left' },
  { id: 'minimal', name: 'Minimal', accent: '#111111', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'centered' },
  { id: 'harvard', name: 'Harvard', accent: '#8c1515', font: "Georgia, serif", layout: 'single', headerStyle: 'centered' },
  { id: 'software-engineer', name: 'Software Engineer', accent: '#06b6d4', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'left' },
  { id: 'data-scientist', name: 'Data Scientist', accent: '#7c3aed', font: "'Inter', sans-serif", layout: 'sidebar', headerStyle: 'left' },
  { id: 'product-manager', name: 'Product Manager', accent: '#ea580c', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'left' },
  { id: 'designer', name: 'Designer', accent: '#db2777', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'centered' },
  { id: 'fresher', name: 'Fresher', accent: '#16a34a', font: "'Inter', sans-serif", layout: 'single', headerStyle: 'left' },
  { id: 'experienced', name: 'Experienced', accent: '#1f2937', font: "'Inter', sans-serif", layout: 'sidebar', headerStyle: 'left' },
]

export function getTemplate(id) {
  return RESUME_TEMPLATES.find((t) => t.id === id) || RESUME_TEMPLATES[0]
}
