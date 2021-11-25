import React from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
import { getElements } from "./elements/elements";
import { createGraphLayout } from "./dagre";

const Builder = () => {
  const initialElements = getElements();

  const targetId = "3";
  const filter = (element: any) =>
    (element.id.split("-")[0] === targetId && !element.source) ||
    (element.source?.split("-")[0] === targetId &&
      element.target?.split("-")[0] === targetId);

  const filteredElements = initialElements.filter(filter);
  const layoutedElements = createGraphLayout(filteredElements);
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
