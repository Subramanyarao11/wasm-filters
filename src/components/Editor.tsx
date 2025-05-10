import { useImageStore } from '../store/imageStore';
import useReader from '../hooks/useReader';
import useCanvas from '../hooks/useCanvas';

const Editor = () => {
  const filters = ["oceanic", "vintage", "rosetint"];
  const file = useImageStore(state => state.file);
  const filter = useImageStore(state => state.filter);
  const setFilter = useImageStore(state => state.setFilter);

  const { canvasRef, canvasImgURL } = useCanvas(file, filter);

  const { reader } = useReader(file, () => {
    if (!reader.result) return;
  });

  return (
    <div className="my-8">
      <canvas width="448" height="448" ref={canvasRef}></canvas>
      <div className="text-white text-xl mt-4">
        <div className="flex justify-center gap-4">
          {filters.map((filterName, index) => (
            <button
              key={index}
              type="button"
              className={`py-4 w-full ${
                filter !== filterName ? 'bg-pink-600' : 'bg-green-600'
              }`}
              onClick={() => setFilter(filterName)}
            >
              {filterName}
            </button>
          ))}
        </div>
        <a
          className="bg-indigo-700 py-4 block w-full mt-2 text-center"
          href={canvasImgURL}
          download="image.png"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Editor;
