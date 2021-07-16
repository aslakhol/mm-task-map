import React from "react";
import "./App.css";
import Canvas from "./Canvas";
import { draw } from "./draw";

const App = () => {
  return (
    <div className="App">
      <Canvas draw={draw} height={3500} width={7000} />
    </div>
  );
};

export default App;
