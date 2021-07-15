import React from "react";
import "./App.css";
import Canvas from "./Canvas";

const App = () => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(100 * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const draw2 = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 50, 50);
  };

  return (
    <div className="App">
      <Canvas draw={drawTaskImproved} height={700} width={700} />
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

const drawTask = (ctx: CanvasRenderingContext2D) => {
  console.log(foo.Tasknumber + foo["Items Needed"]);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  let rectX = 350;
  let rectY = 350;
  let rectWidth = 100;
  let rectHeight = 50;
  roundRect(ctx, rectX, rectY, rectWidth, rectHeight, 5, true);
  ctx.font = "10px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "#000000";

  ctx.fillText(
    foo.Tasknumber,
    rectX + rectWidth / 2,
    rectY + rectHeight / 2,
    rectWidth
  );
  ctx.fillText(
    foo["Items Needed"],
    rectX + rectWidth / 2,
    rectY + rectHeight / 2 + 10,
    rectWidth
  );
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

const drawTaskImproved = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  let rectX = 50;
  let rectY = 50;
  let rectWidth = 150;
  let rectHeight = 80;
  roundRect(ctx, rectX, rectY, rectWidth, rectHeight, 5, true);
  const text = foo.Tasknumber + "\n" + foo.Name + "\n" + foo["Items Needed"];
  fitTextCenter(ctx, text, rectX, rectY, rectWidth, rectHeight);
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
    let xL = (width - x) / 2;
    let yL = y + (height / (lines.length + 1)) * (i + 1);

    ctx.fillText(lines[i], xL, yL);
  }
};
