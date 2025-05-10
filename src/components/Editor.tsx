"use client"

import { useImageStore } from "../store/imageStore"
import useReader from "../hooks/useReader"
import useCanvas from "../hooks/useCanvas"
import { Download, RefreshCw } from "lucide-react"

const Editor = () => {
  const filters = [
    { id: "oceanic", name: "Oceanic", color: "bg-cyan-500" },
    { id: "vintage", name: "Vintage", color: "bg-amber-500" },
    { id: "rosetint", name: "Rose Tint", color: "bg-rose-500" },
  ]

  const file = useImageStore((state) => state.file)
  const filter = useImageStore((state) => state.filter)
  const setFilter = useImageStore((state) => state.setFilter)
  const resetImage = useImageStore((state) => state.resetImage)

  const { canvasRef, canvasImgURL } = useCanvas(file, filter)

  const { reader } = useReader(file, () => {
    if (!reader.result) return
  })

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <canvas width="448" height="448" ref={canvasRef} className="max-w-full h-auto"></canvas>
        </div>

        <button
          onClick={resetImage}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-700 transition-all duration-200 cursor-pointer"
          title="Reset image"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="w-full mt-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {filters.map((filterOption) => (
            <button
              key={filterOption.id}
              type="button"
              className={`py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer ${
                filter === filterOption.id
                  ? `${filterOption.color} text-white shadow-md`
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              onClick={() => setFilter(filterOption.id)}
            >
              <span className="font-medium">{filterOption.name}</span>
            </button>
          ))}
        </div>

        <a
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg shadow-md transition-all duration-200 font-medium"
          href={canvasImgURL}
          download="filtered-image.png"
        >
          <Download size={18} />
          Download Image
        </a>
      </div>
    </div>
  )
}

export default Editor
