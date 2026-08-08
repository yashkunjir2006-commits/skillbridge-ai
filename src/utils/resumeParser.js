// Real, client-side resume text extraction.
// PDF -> pdfjs-dist, DOCX -> mammoth, TXT -> read directly. No server, no upload.

import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import mammoth from 'mammoth'
import { ACCEPTED_TYPES, isAcceptedFile } from './fileTypes'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export { ACCEPTED_TYPES, isAcceptedFile }

async function extractFromPdf(file) {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((item) => item.str).join(' ')
    text += pageText + '\n'
  }
  return text
}

async function extractFromDocx(file) {
  const buffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer: buffer })
  return result.value
}

async function extractFromTxt(file) {
  return file.text()
}

/**
 * Extract plain text from an uploaded resume file.
 * Returns { text, pageCount, warnings }.
 */
export async function extractResumeText(file) {
  const name = file.name.toLowerCase()
  const warnings = []

  try {
    if (name.endsWith('.pdf')) {
      const text = await extractFromPdf(file)
      if (!text.trim()) {
        warnings.push('This PDF may be scanned/image-based — little or no selectable text was found.')
      }
      return { text, warnings }
    }
    if (name.endsWith('.docx')) {
      const text = await extractFromDocx(file)
      return { text, warnings }
    }
    if (name.endsWith('.txt')) {
      const text = await extractFromTxt(file)
      return { text, warnings }
    }
    throw new Error('Unsupported file type. Please upload a PDF, DOCX, or TXT file.')
  } catch (err) {
    throw new Error(err.message || 'Could not read this file.')
  }
}
