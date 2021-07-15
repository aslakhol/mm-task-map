import React from "react";
import "./App.css";
import Canvas from "./Canvas";
import Edges from "./Edges";

const App = () => {
  return (
    <div className="App">
      <Edges />
      <Canvas draw={draw} height={700} width={700} />
    </div>
  );
};

export default App;

const foo = {
  Tasknumber: "4-1",
  Name: "Demolish rickety bridge",
  "Available after": "Level 9",
  "Opens Task": "4-2",
  "Items Needed": "Axe,\u00a0Crowbar",
  Rewards: "3 XP,\u00a0Energy Chest",
};

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const taskText =
    foo.Tasknumber + "\n" + foo.Name + "\n" + foo["Items Needed"];
  drawTask(ctx, taskText, 350, 200);
};

const drawTask = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) => {
  const w = 150;
  const h = 80;
  roundRect(ctx, x, y, w, h, 5, true);
  fitTextCenter(ctx, text, x, y, w, h);
};

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 5,
  stroke = true
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  } else {
    ctx.fill();
  }
};

const fitTextCenter = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  let fontSize = getFontSizeToFit(ctx, text, "Arial", w, h);
  ctx.font = fontSize + "px Arial";

  fillTextCenter(ctx, text, x, y, w, h);
};

const getFontSizeToFit = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontFace: string,
  width: number,
  height: number
) => {
  ctx.font = `1px ${fontFace}`;

  let fitFontWidth = Number.MAX_VALUE;
  const lines = text.match(/[^\r\n]+/g);
  lines?.forEach((line) => {
    fitFontWidth = Math.min(fitFontWidth, width / ctx.measureText(line).width);
  });
  let fitFontHeight = height / ((lines?.length || 1) * 1.2); // if you want more spacing between line, you can increase this value
  return Math.min(fitFontHeight, fitFontWidth);
};

const fillTextCenter = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const lines = text.match(/[^\r\n]+/g) || text;
  for (let i = 0; i < lines.length; i++) {
    const xL = x + width / 2;
    const yL = y + (height / (lines.length + 1)) * (i + 1);

    ctx.fillText(lines[i], xL, yL);
  }
};
