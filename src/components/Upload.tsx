import type React from "react"
import { useImageStore } from "../store/imageStore"
import { UploadIcon } from "lucide-react"

const Upload = () => {
  const upload = useImageStore((state) => state.upload)

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const event = { dataTransfer: { files: [file] } } as unknown as React.DragEvent<HTMLDivElement>
      upload(event)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full border-2 border-dashed border-violet-200 rounded-xl p-8 transition-all duration-300 hover:border-violet-400 cursor-pointer bg-violet-50/50 hover:bg-violet-50"
        onDrag={preventDefault}
        onDragStart={preventDefault}
        onDragEnd={preventDefault}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onDragLeave={preventDefault}
        onDrop={(e) => {
          preventDefault(e)
          upload(e)
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="flex flex-col items-center gap-4 py-10">
          <div className="p-4 bg-violet-100 rounded-full text-violet-600">
            <UploadIcon size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-slate-700">Drag and drop your image here</p>
            <p className="text-sm text-slate-500 mt-1">or click to browse files</p>
          </div>
          <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG and GIF</p>
        </div>
      </div>
      <input id="file-input" type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
    </div>
  )
}

export default Upload
