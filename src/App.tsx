import Editor from './components/Editor';
import Upload from './components/Upload';
import { useImageStore } from './store/imageStore';

function App() {
  const file = useImageStore(state => state.file);

  return (
    <>
      <div className="font-quicksand max-w-xl bg-white p-8 shadow-2xl rounded absolute m-auto left-0 right-0 mt-32">
        <h1 className="text-center text-3xl text-indigo-700">React Filters</h1>
        {!file ? <Upload /> : <Editor />}
      </div>
    </>
  );
}

export default App;
