import { useImageStore } from "../store/imageStore";


const Upload = () => {
  const upload = useImageStore(state => state.upload);

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="text-center my-8 py-32 text-slate-700 italic rounded border-4 border-double border-slate-700/25"
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onDragEnd={preventDefault}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onDragLeave={preventDefault}
      onDrop={(e) => {
        preventDefault(e);
        upload(e);
      }}
    >
      Drag and drop image.
    </div>
  );
};

export default Upload;
