import React from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
import { getElements } from "./elements/elements";
import { createGraphLayout } from "./dagre";

const Builder = () => {
  const initialElements = getElements();
  const layoutedElements = createGraphLayout(initialElements);
  return <ReactFlow elements={layoutedElements} />;
};

const Digraph = () => {
  return (
    <div className="layoutflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <Builder />
      </ReactFlowProvider>
    </div>
  );
};

export default Digraph;
