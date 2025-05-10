import Editor from "./components/Editor"
import Upload from "./components/Upload"
import { useImageStore } from "./store/imageStore"

function App() {
  const file = useImageStore((state) => state.file)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6">
          <h1 className="text-center text-3xl font-bold text-white">Filterfy</h1>
          <p className="text-center text-violet-100 mt-1">Transform your images with beautiful filters</p>
        </div>
        <div className="p-6">{!file ? <Upload /> : <Editor />}</div>
      </div>
    </div>
  )
}

export default App
