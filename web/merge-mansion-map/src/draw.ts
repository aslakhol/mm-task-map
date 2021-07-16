import { getEdgesArray } from "./edges";
import { getNodesArray } from "./nodes";

export const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const tasks = getNodesArray();
  const edges = getEdgesArray();
  const visitedTasks = Array(tasks.length).fill(0);
  const nodePositions = Array(tasks.length).fill([0, 0]);

  for (let i = 0; i < tasks.length; i++) {
    drawSpecificTask(ctx, i, 0, 0 + i * 90, visitedTasks, nodePositions, tasks);

    for (let e = 0; e < edges[i].length; e++) {
      const childIndex = edges[i][e];
      if (!childIndex) {
        continue;
      }
      console.log(nodePositions[i], tasks[i].Tasknumber, " alskjdlsakj");
      const xValue = nodePositions[i][0] + 80 * e;
      const yValue = nodePositions[i][1] + 40;
      console.log(xValue, yValue, "boo");
      drawSpecificTask(
        ctx,
        childIndex,
        xValue,
        yValue,
        visitedTasks,
        nodePositions,
        tasks
      );
    }

    console.log(tasks[i].Tasknumber + " e: " + edges[i]);
  }
};

const drawSpecificTask = (
  ctx: CanvasRenderingContext2D,
  index: number,
  x: number,
  y: number,
  visitedTasks: number[],
  nodePositions: Array<[number, number]>,
  tasks: any
) => {
  if (visitedTasks[index] === 1) {
    console.log("skipped task: " + index + " " + tasks[index].Tasknumber);
    return;
  }
  visitedTasks[index] = 1;
  nodePositions[index] = [x, y];

  drawTask(
    ctx,
    tasks[index].Tasknumber +
      "\n" +
      tasks[index].Name +
      "\n" +
      tasks[index]["Items Needed"],
    x,
    y
  );
};

const drawTask = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) => {
  const w = 80;
  const h = 40;
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
