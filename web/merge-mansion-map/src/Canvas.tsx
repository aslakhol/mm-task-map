import React, { useRef, useEffect } from "react";

const Canvas = (props: {
  draw: (context: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
}) => {
  const { draw, height, width } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d") ?? null;

    if (canvas === null || context === null) {
      throw new Error("couldn't find canvas");
    }
    draw(context);
  });

  return <canvas ref={canvasRef} height={height} width={width} />;
};

export default Canvas;
