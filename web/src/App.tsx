import React, { useState } from "react";
import "./App.css";
import Digraph from "./Digraph";
import Filter from "./Filter/Filter";
import Info from "./Info/Info";

const App = () => {
  const [filterValue, setFilterValue] = useState("all");

  return (
    <div className="App">
      <Info />
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <Digraph filterValue={filterValue} />
    </div>
  );
};

export default App;
