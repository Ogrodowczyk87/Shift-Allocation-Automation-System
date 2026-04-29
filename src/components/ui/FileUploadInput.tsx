import { useRef, useState } from 'react'
import { createEmployeePhotoUpload } from '../../services/api/employees'

type Props = {
  employeeId: string
  onChange?: (url: string) => void
}

export function PhotoUpload({ employeeId, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const maxSizeBytes = 5 * 1024 * 1024

  const handlePick = () => inputRef.current?.click()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !employeeId.trim()) return

    setError('')

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed.')
      }

      if (file.size > maxSizeBytes) {
        throw new Error('Image must be smaller than 5 MB.')
      }

      setIsUploading(true)

      const { uploadUrl, fileUrl } = await createEmployeePhotoUpload(
        file.name,
        file.type,
        employeeId.trim()
      )

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image.')
      }

      setFileName(file.name)
      setPreviewUrl(fileUrl)
      onChange?.(fileUrl)
    } catch (error) {
      setFileName('')
      setPreviewUrl(null)
      onChange?.('')
      setError(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">Photo</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handlePick}
        disabled={!employeeId.trim() || isUploading}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        {isUploading ? 'Uploading...' : 'Upload photo'}
      </button>

      {fileName ? <p className="text-xs text-slate-500">{fileName}</p> : null}
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}

      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="h-24 w-24 rounded-full object-cover ring-2 ring-sky-200"
        />
      ) : null}
    </div>
  )
}
