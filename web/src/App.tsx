import React from "react";
import "./App.css";
import Digraph from "./Digraph";
import Filter from "./Filter/Filter";
import Info from "./Info/Info";

const App = () => {
  return (
    <div className="App">
      <Info />
      <Filter />
      <Digraph />
    </div>
  );
};

export default App;
