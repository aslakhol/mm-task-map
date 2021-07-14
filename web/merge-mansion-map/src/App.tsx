import React from "react";
import "./App.css";
import Canvas from "./Canvas";

const App = () => {
  const draw = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(100 * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <div className="App">
      <Canvas draw={draw} />
    </div>
  );
};

export default App;
