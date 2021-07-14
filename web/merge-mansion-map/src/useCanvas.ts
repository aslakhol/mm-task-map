import { useRef, useEffect } from "react";

const updateCanvasSize = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) => {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);
    return true;
  }

  return false;
};

const useCanvas = (draw: (context: CanvasRenderingContext2D) => {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context == null || canvas == null) {
      throw new Error("couldn't find either context or canvas");
    }

    updateCanvasSize(canvas, context);
    draw(context);
  }, [draw]);

  return canvasRef;
};

export default useCanvas;

// const postdraw = () => {
//   index++;
//   ctx.restore();
// };

// const predraw = (context, canvas) => {
//   context.save();
//   resizeCanvasToDisplaySize(context, canvas);
//   const { width, height } = context.canvas;
//   context.clearRect(0, 0, width, height);
// };
