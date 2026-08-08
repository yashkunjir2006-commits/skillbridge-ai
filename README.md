# SkillBridge AI

A complete AI career platform — landing page, dashboard, and 17+ feature pages —
built with React 19, Vite, Motion, Lucide React, and plain CSS (no Tailwind/MUI/Bootstrap).

## Tech stack

- React 19 + Vite
- React Router v7
- `motion` (motion/react) for animation
- `lucide-react` for icons
- `pdfjs-dist` + `mammoth` for real client-side PDF/DOCX text extraction
- `docx` + `file-saver` for real .docx file generation/download
- Plain CSS — a minimal black/white design system for most of the app, plus a
  scoped glassmorphism layer (`src/styles/glass.css`) for the premium AI surfaces

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Premium AI features (glassmorphism layer)

Three areas got a dedicated redesign with a distinct "premium AI surface" look
(frosted glass cards, gradient mesh background, glass buttons/tabs, animated
progress rings, skeleton loaders) — everything else keeps the locked-down
minimal landing page design untouched.

### AI Resume Generator (`/resume` → "AI Generator" tab)
- 11 ATS-friendly templates (Modern ATS, Google Style, Microsoft Style, Minimal,
  Harvard, Software Engineer, Data Scientist, Product Manager, Designer, Fresher,
  Experienced) with live A4 thumbnails in the gallery
- Structured inputs (role, level, skills, projects, experience, education) →
  pattern-based generation of a summary, experience bullets, project descriptions,
  achievements, and interests (`src/utils/resumeGenerator.js`)
- Live, real-proportion A4 preview that updates instantly and survives template switches
- Real export: PDF via print-ready A4 CSS, and a genuine `.docx` file via the `docx` library

### Resume Analyzer (`/resume` → "Analyze" tab)
- Real drag-and-drop upload for PDF, DOCX, or TXT — text is extracted fully
  client-side with `pdfjs-dist` (PDF) and `mammoth` (DOCX); nothing is uploaded
  to a server (`src/utils/resumeParser.js`)
- Comprehensive analysis dashboard, all computed transparently in
  `src/utils/resumeAnalysis.js`: overall ATS score, formatting score, keyword
  match against a chosen target role, detected/missing skills, project-by-project
  scoring (strengths/weaknesses/suggestions/complexity/recruiter impression),
  experience analysis (impact/verbs/metrics), education checks, grammar flags
  (passive voice, long sentences), weak-phrase suggestions, interview readiness,
  and recommended job roles
- Three real downloads: ATS report, improved resume, and a generated cover letter

### Learning Hub (`/learning`)
- 9 structured topics (DSA, React, Python, Java, AI, Machine Learning, DevOps,
  System Design, Web Development), each with difficulty, estimated hours,
  community rating, and prerequisites (`src/data/learningResources.js`)
- Real resource links per topic — official docs, freeCodeCamp, Coursera, Kaggle,
  LeetCode, GeeksforGeeks, Udemy, and more — each with provider/type/duration/
  free-or-paid/rating and a completion checkbox that updates live progress
- Per-topic quiz and project ideas, plus a rule-based "AI Mentor" chat that
  routes questions to the right resource/quiz/project
- AI Learning Recommendation: upload a resume, pick a target role, and get a
  personalized week-by-week roadmap built from the actual missing skills

## Project structure

```
src/
  assets/         static assets
  animations/     shared Motion variants (navbar, hero, footer, stagger)
  components/
    landing/      Navbar, HeroVideo, FooterHero, FeaturesSection
    dashboard/    Sidebar, TopNavbar
    resume/       AI Resume Generator, Resume Analyzer, A4 preview, template gallery, drop zone
    learning/     Topic cards/detail, quizzes, AI roadmap generator, mentor chat
    common/       Card, Button, Tag, StatCard, ProgressBar, PageHeader, EmptyState, Skeleton, etc.
  constants/      nav config
  data/           mock data, resume templates, learning resources, skill library
  hooks/          (reserved for shared hooks)
  layouts/        DashboardLayout (sidebar + topbar + routed content)
  pages/          one file per route/feature
  routes/         route table (routes.jsx)
  services/       (reserved for future backend integration)
  styles/         global design system, shared feature-page CSS, glassmorphism layer
  utils/          resume parsing/analysis/generation, DOCX export
```

## Routes

| Path              | Page                     |
|--------------------|--------------------------|
| `/`                | Landing                  |
| `/dashboard`        | Dashboard Home           |
| `/resume`           | AI Resume Generator + Analyzer |
| `/ats`              | ATS Score                |
| `/coach`            | AI Career Coach          |
| `/roadmap`          | Career Roadmap           |
| `/skills`           | Skill Analyzer           |
| `/mock-interview`   | Mock Interview           |
| `/mock-tests`       | Mock Tests               |
| `/learning`         | Learning Hub             |
| `/jobs`             | Job Matching             |
| `/internships`      | Internship Hub           |
| `/chat`             | AI Chat                  |
| `/portfolio`        | Portfolio Builder        |
| `/certificates`     | Certification Tracker    |
| `/projects`         | Project Builder          |
| `/bookmarks`        | Bookmarks                |
| `/community`        | Community                |
| `/settings`         | Settings                 |

## Notes on "AI" features

Nothing in this build calls a real AI model or backend — it's a frontend-only
product demo. Resume/PDF text extraction (`resumeParser.js`), ATS scoring
(`resumeAnalysis.js`), and DOCX export (`docxExport.js`) run genuine logic
against real files. Resume generation, the roadmap generator, and the AI Mentor
chat use transparent pattern-based/rule-based logic and are labeled as such in
the UI, so it's clear what's real computation versus a placeholder for future
backend/LLM integration.
