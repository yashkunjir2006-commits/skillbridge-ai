export const ACCEPTED_TYPES = ['.pdf', '.docx', '.txt']

export function isAcceptedFile(file) {
  const name = file.name.toLowerCase()
  return ACCEPTED_TYPES.some((ext) => name.endsWith(ext))
}
