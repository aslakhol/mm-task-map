import React from "react";
import "./App.css";
import Digraph from "./Digraph";
import Info from "./Info/Info";

const App = () => {
  return (
    <div className="App">
      <Info />
      <Digraph />
    </div>
  );
};

export default App;
