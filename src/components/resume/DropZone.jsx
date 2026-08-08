import { useCallback, useRef, useState } from 'react'
import { UploadCloud, FileText, X } from 'lucide-react'
import { isAcceptedFile } from '../../utils/fileTypes'
import './DropZone.css'

export default function DropZone({ file, onFile, onClear, error }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = useCallback(
    (files) => {
      const picked = files[0]
      if (!picked) return
      if (!isAcceptedFile(picked)) {
        onFile(null, 'Please upload a PDF, DOCX, or TXT file.')
        return
      }
      onFile(picked, null)
    },
    [onFile]
  )

  if (file) {
    return (
      <div className="dropzone dropzone--filled">
        <div className="dropzone__file-icon">
          <FileText size={18} strokeWidth={1.8} />
        </div>
        <div className="dropzone__file-info">
          <p>{file.name}</p>
          <span>{(file.size / 1024).toFixed(0)} KB</span>
        </div>
        <button className="dropzone__clear" onClick={onClear} aria-label="Remove file">
          <X size={16} strokeWidth={2} />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`dropzone ${dragging ? 'dropzone--dragging' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      <span className="dropzone__icon">
        <UploadCloud size={22} strokeWidth={1.6} />
      </span>
      <p className="dropzone__title">Drag & drop your resume</p>
      <p className="dropzone__desc">or click to browse — PDF, DOCX, or TXT</p>
      {error && <p className="dropzone__error">{error}</p>}
    </div>
  )
}
