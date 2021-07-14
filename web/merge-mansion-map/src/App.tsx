import React from "react";
import "./App.css";
import Canvas from "./Canvas";

const App = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(50, 100, 20 * Math.sin(100 * 0.05) ** 2, 0, 2 * Math.PI);
    context.fill();
  };

  const draw2 = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "rgb(200, 0, 0)";
    context.fillRect(10, 10, 50, 50);

    context.fillStyle = "rgba(0, 0, 200, 0.5)";
    context.fillRect(30, 30, 50, 50);
  };

  return (
    <div className="App">
      <Canvas draw={draw} height={100} width={100} />
    </div>
  );
};

export default App;
