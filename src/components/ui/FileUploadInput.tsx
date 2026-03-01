import { useRef, useState } from "react"

export function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")

  const handlePick = () => inputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setPreviewUrl(URL.createObjectURL(file))
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
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        Upload photo
      </button>

      {fileName && <p className="text-xs text-slate-500">{fileName}</p>}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="h-24 w-24 rounded-full object-cover ring-2 ring-sky-200"
        />
      )}
    </div>
  )
}
