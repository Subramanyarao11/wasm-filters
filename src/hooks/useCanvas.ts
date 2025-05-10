import { useRef, useEffect, useState } from 'react';
import { open_image, filter as applyFilter, putImageData } from '@silvia-odwyer/photon';

export default function useCanvas(file: File | null, currentFilter: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasImgURL, setCanvasImgURL] = useState<string>("");
  const imgElRef = useRef<HTMLImageElement>(new Image());

  function calculateAspectRatio(
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  function drawOriginalImage() {
    const canvasEl = canvasRef.current;
    const imgEl = imgElRef.current;

    if (!canvasEl || !imgEl.src) return;

    const canvasCtx = canvasEl.getContext('2d');
    if (!canvasCtx) return;

    const newImgDimension = calculateAspectRatio(
      imgEl.naturalWidth,
      imgEl.naturalHeight,
      448,
      448
    );

    canvasEl.width = newImgDimension.width;
    canvasEl.height = newImgDimension.height;

    canvasCtx.drawImage(
      imgEl,
      0,
      0,
      newImgDimension.width,
      newImgDimension.height
    );

    setCanvasImgURL(canvasEl.toDataURL());
  }

  function filterImage(filterName: string) {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const canvasCtx = canvasEl.getContext('2d');
    if (!canvasCtx) return;

    const photonImage = open_image(canvasEl, canvasCtx);

    if (filterName.length) {
      applyFilter(photonImage, filterName);
    }

    putImageData(canvasEl, canvasCtx, photonImage);
    setCanvasImgURL(canvasEl.toDataURL());
  }

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target || typeof e.target.result !== 'string') return;

      const imgEl = imgElRef.current;
      imgEl.src = e.target.result;

      imgEl.onload = () => {
        drawOriginalImage();
      };
    };
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (!canvasRef.current || !imgElRef.current.src) return;
    drawOriginalImage();
    filterImage(currentFilter);
  }, [currentFilter]);

  return { canvasRef, canvasImgURL };
}
