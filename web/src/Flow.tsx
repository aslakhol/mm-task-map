import React from "react";
import ReactFlow from "react-flow-renderer";
import { getElements } from "./elements/elements";

const Flow = () => {
  const elements = getElements();

  return (
    <div style={{ height: 3500 }}>
      <ReactFlow elements={elements} />
    </div>
  );
};

export default Flow;
