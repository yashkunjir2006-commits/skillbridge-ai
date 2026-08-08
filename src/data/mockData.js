export const STATS = [
  { id: 'ats', label: 'ATS Score', value: '82%', delta: '+6% this week', deltaTone: 'success' },
  { id: 'interview', label: 'Interview Readiness', value: '74%', delta: '+3% this week', deltaTone: 'success' },
  { id: 'resume', label: 'Resume Strength', value: '88%', delta: '+2% this week', deltaTone: 'success' },
  { id: 'applications', label: 'Applications', value: '23', delta: '5 this week', deltaTone: 'success' },
  { id: 'learning', label: 'Learning Progress', value: '61%', delta: '+9% this week', deltaTone: 'success' },
]

export const RECENT_ACTIVITY = [
  { id: 1, text: 'Improved resume summary with AI suggestions', time: '2 hours ago' },
  { id: 2, text: 'Completed "System Design Basics" module', time: '5 hours ago' },
  { id: 3, text: 'Ran ATS check against Frontend Engineer JD', time: 'Yesterday' },
  { id: 4, text: 'Finished a 20-question React mock test — 85%', time: '2 days ago' },
  { id: 5, text: 'Generated a roadmap for AI Engineer', time: '3 days ago' },
]

export const RECOMMENDED_JOBS = [
  { id: 1, title: 'Frontend Engineer', company: 'Nimbus Labs', location: 'Remote', match: 92, type: 'Full-time' },
  { id: 2, title: 'AI/ML Intern', company: 'Cortex Systems', location: 'Pune, IN', match: 88, type: 'Internship' },
  { id: 3, title: 'Software Engineer', company: 'Fieldstone Tech', location: 'Bengaluru, IN', match: 81, type: 'Full-time' },
]

export const UPCOMING_INTERVIEWS = [
  { id: 1, title: 'Technical Mock — Data Structures', date: 'Tomorrow, 6:00 PM' },
  { id: 2, title: 'Behavioral Mock — Leadership', date: 'Fri, 4:30 PM' },
]

export const SAVED_LEARNING = [
  { id: 1, title: 'System Design: Scalability Basics', progress: 64 },
  { id: 2, title: 'Advanced React Patterns', progress: 40 },
  { id: 3, title: 'SQL for Interviews', progress: 82 },
]

export const SUGGESTION_CARDS = [
  { id: 'improve-resume', title: 'Improve Resume', to: '/resume' },
  { id: 'find-internship', title: 'Find Internship', to: '/internships' },
  { id: 'practice-interview', title: 'Practice Interview', to: '/mock-interview' },
  { id: 'generate-roadmap', title: 'Generate Roadmap', to: '/roadmap' },
  { id: 'analyze-skills', title: 'Analyze Skills', to: '/skills' },
]

export const LEARNING_TOPICS = [
  { id: 'dsa', title: 'DSA', modules: 42, progress: 55 },
  { id: 'react', title: 'React', modules: 28, progress: 70 },
  { id: 'python', title: 'Python', modules: 34, progress: 48 },
  { id: 'java', title: 'Java', modules: 30, progress: 20 },
  { id: 'ai', title: 'AI', modules: 26, progress: 62 },
  { id: 'ml', title: 'Machine Learning', modules: 31, progress: 58 },
  { id: 'devops', title: 'DevOps', modules: 19, progress: 12 },
  { id: 'system-design', title: 'System Design', modules: 22, progress: 35 },
  { id: 'web-dev', title: 'Web Development', modules: 36, progress: 66 },
]

export const CAREER_PATHS = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    timeline: '9–12 months',
    salary: '₹8–18 LPA',
    skills: ['Data Structures & Algorithms', 'System Design', 'Git & CI/CD', 'SQL', 'One backend framework'],
    projects: ['REST API with auth', 'Distributed task queue', 'Full-stack CRUD app'],
    courses: ['DSA in-depth', 'System design primer', 'Databases fundamentals'],
    roles: ['SDE-1', 'Backend Engineer', 'Full-stack Engineer'],
    companies: ['Product startups', 'Mid-size SaaS', 'Big tech (entry-level)'],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    timeline: '10–14 months',
    salary: '₹9–20 LPA',
    skills: ['Statistics & probability', 'Python (pandas, numpy)', 'SQL', 'ML fundamentals', 'Data visualization'],
    projects: ['End-to-end ML pipeline', 'A/B testing dashboard', 'Time-series forecasting model'],
    courses: ['Applied statistics', 'ML with scikit-learn', 'Data storytelling'],
    roles: ['Data Scientist', 'ML Analyst', 'Decision Scientist'],
    companies: ['Analytics consultancies', 'Fintech', 'E-commerce'],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    timeline: '6–9 months',
    salary: '₹6–15 LPA',
    skills: ['JavaScript/TypeScript', 'React', 'CSS architecture', 'Accessibility', 'Web performance'],
    projects: ['Component library', 'Dashboard with charts', 'Progressive web app'],
    courses: ['Modern JavaScript', 'React deep dive', 'Web performance fundamentals'],
    roles: ['Frontend Engineer', 'UI Engineer', 'Product Engineer'],
    companies: ['Design-led startups', 'Agencies', 'SaaS companies'],
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    timeline: '10–14 months',
    salary: '₹10–22 LPA',
    skills: ['Deep learning fundamentals', 'PyTorch/TensorFlow', 'LLM tooling', 'MLOps basics', 'Python'],
    projects: ['Fine-tuned classifier', 'RAG-based assistant', 'Model serving API'],
    courses: ['Deep learning specialization', 'LLM engineering', 'MLOps fundamentals'],
    roles: ['AI Engineer', 'ML Engineer', 'Applied Scientist (entry)'],
    companies: ['AI-first startups', 'R&D labs', 'Big tech AI teams'],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    timeline: '8–12 months',
    salary: '₹7–17 LPA',
    skills: ['Linux fundamentals', 'AWS/Azure/GCP', 'Terraform', 'Networking basics', 'CI/CD pipelines'],
    projects: ['IaC deployment pipeline', 'Multi-region architecture', 'Kubernetes cluster setup'],
    courses: ['Cloud practitioner track', 'Terraform in-depth', 'Kubernetes fundamentals'],
    roles: ['Cloud Engineer', 'DevOps Engineer', 'Platform Engineer'],
    companies: ['Cloud consultancies', 'Enterprise IT', 'SaaS infra teams'],
  },
  {
    id: 'cyber-security-engineer',
    title: 'Cyber Security Engineer',
    timeline: '9–13 months',
    salary: '₹7–18 LPA',
    skills: ['Network security', 'Threat modeling', 'Penetration testing basics', 'SIEM tools', 'Cryptography basics'],
    projects: ['Vulnerability assessment report', 'Home-lab intrusion detection setup', 'Secure API hardening'],
    courses: ['Security fundamentals', 'Ethical hacking basics', 'Cloud security essentials'],
    roles: ['Security Analyst', 'SOC Engineer', 'AppSec Engineer'],
    companies: ['Security consultancies', 'Banks & fintech', 'Enterprise IT'],
  },
]

export const JOB_LISTINGS = [
  { id: 1, title: 'Frontend Engineer', company: 'Nimbus Labs', location: 'Remote', type: 'Full-time', match: 92, skills: ['React', 'TypeScript', 'CSS'] },
  { id: 2, title: 'Backend Engineer', company: 'Fieldstone Tech', location: 'Bengaluru, IN', type: 'Full-time', match: 85, skills: ['Node.js', 'PostgreSQL', 'AWS'] },
  { id: 3, title: 'ML Engineer', company: 'Cortex Systems', location: 'Hybrid — Pune, IN', type: 'Full-time', match: 79, skills: ['Python', 'PyTorch', 'MLOps'] },
  { id: 4, title: 'Product Engineer', company: 'Loop Software', location: 'Remote', type: 'Full-time', match: 74, skills: ['React', 'Node.js', 'GraphQL'] },
  { id: 5, title: 'Data Analyst', company: 'Harborline', location: 'Mumbai, IN', type: 'Full-time', match: 70, skills: ['SQL', 'Python', 'Tableau'] },
]

export const INTERNSHIP_LISTINGS = [
  { id: 1, title: 'AI/ML Intern', company: 'Cortex Systems', location: 'Pune, IN', duration: '6 months', match: 88, deadline: 'Aug 20, 2026' },
  { id: 2, title: 'Frontend Intern', company: 'Nimbus Labs', location: 'Remote', duration: '3 months', match: 84, deadline: 'Aug 15, 2026' },
  { id: 3, title: 'Data Science Intern', company: 'Harborline', location: 'Mumbai, IN', duration: '6 months', match: 77, deadline: 'Aug 28, 2026' },
]

export const MOCK_TEST_CATEGORIES = [
  { id: 'aptitude', title: 'Aptitude', questions: 30, duration: '30 min' },
  { id: 'logical', title: 'Logical Reasoning', questions: 25, duration: '25 min' },
  { id: 'programming', title: 'Programming Fundamentals', questions: 20, duration: '30 min' },
  { id: 'sql', title: 'SQL', questions: 20, duration: '20 min' },
  { id: 'java', title: 'Java', questions: 25, duration: '30 min' },
  { id: 'python', title: 'Python', questions: 25, duration: '30 min' },
  { id: 'react', title: 'React', questions: 20, duration: '25 min' },
  { id: 'javascript', title: 'JavaScript', questions: 25, duration: '30 min' },
]

export const LEADERBOARD = [
  { id: 1, name: 'Ananya R.', score: 980 },
  { id: 2, name: 'Rohit K.', score: 940 },
  { id: 3, name: 'Yash', score: 915, isUser: true },
  { id: 4, name: 'Meera S.', score: 890 },
  { id: 5, name: 'Devansh P.', score: 860 },
]

export const CERTIFICATIONS = [
  { id: 1, name: 'Google IT Support Professional', provider: 'Google', status: 'In progress', progress: 62, expiry: '—' },
  { id: 2, name: 'AWS Certified Cloud Practitioner', provider: 'AWS', status: 'Not started', progress: 0, expiry: '—' },
  { id: 3, name: 'Meta Front-End Developer', provider: 'Coursera', status: 'Completed', progress: 100, expiry: 'Mar 2028' },
  { id: 4, name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', status: 'In progress', progress: 30, expiry: '—' },
]

export const PROJECT_IDEAS = [
  { id: 1, title: 'AI Resume Parser', difficulty: 'Intermediate', stack: ['Python', 'spaCy', 'FastAPI'], resumeValue: 'High' },
  { id: 2, title: 'Real-time Chat App', difficulty: 'Intermediate', stack: ['React', 'Socket.IO', 'Node.js'], resumeValue: 'Medium' },
  { id: 3, title: 'Expense Tracker with ML Insights', difficulty: 'Beginner', stack: ['React', 'Chart.js', 'Node.js'], resumeValue: 'Medium' },
  { id: 4, title: 'Distributed Job Queue', difficulty: 'Advanced', stack: ['Go', 'Redis', 'Docker'], resumeValue: 'High' },
]

export const COMMUNITY_GROUPS = [
  { id: 1, title: 'DSA Grinders — Daily POTD', members: 1240, tag: 'Study Group' },
  { id: 2, title: 'System Design Circle', members: 860, tag: 'Study Group' },
  { id: 3, title: 'Frontend Coding Room', members: 540, tag: 'Coding Room' },
  { id: 4, title: 'Interview Experiences — 2026 Batch', members: 2100, tag: 'Experiences' },
]
