import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, color: '111111' })],
  })
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text })],
  })
}

function paragraph(text) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text })] })
}

export async function exportResumeToDocx(resume) {
  const children = [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [new TextRun({ text: resume.name || 'Your Name', bold: true, size: 40 })],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: resume.role || 'Target Role', size: 24, color: '555555' })],
    }),
  ]

  if (resume.summary) {
    children.push(heading('Summary'))
    children.push(paragraph(resume.summary))
  }

  if (resume.skills?.length) {
    children.push(heading('Skills'))
    children.push(paragraph(resume.skills.join(' · ')))
  }

  if (resume.experienceBullets?.length) {
    children.push(heading('Experience'))
    resume.experienceBullets.forEach((b) => children.push(bullet(b)))
  }

  if (resume.projects?.length) {
    children.push(heading('Projects'))
    resume.projects.forEach((p) => {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: p.title, bold: true })],
        })
      )
      children.push(bullet(p.body))
    })
  }

  if (resume.education) {
    children.push(heading('Education'))
    children.push(paragraph(resume.education))
  }

  if (resume.achievements?.length) {
    children.push(heading('Achievements'))
    resume.achievements.forEach((a) => children.push(bullet(a)))
  }

  if (resume.certifications) {
    children.push(heading('Certifications'))
    children.push(paragraph(resume.certifications))
  }

  if (resume.interests?.length) {
    children.push(heading('Interests'))
    children.push(paragraph(resume.interests.join(' · ')))
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${(resume.name || 'resume').replace(/\s+/g, '_')}_SkillBridge.docx`)
}
