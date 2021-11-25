import React from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
import { getElements } from "./elements/elements";
import { createGraphLayout } from "./dagre";

const Builder = (props: { targetId: string }) => {
  const { targetId } = props;
  const initialElements = getElements();

  console.log(targetId);

  const filter = (element: any) => {
    if (targetId === "all") {
      return element;
    }

    return (
      (element.id.split("-")[0] === targetId && !element.source) ||
      (element.source?.split("-")[0] === targetId &&
        element.target?.split("-")[0] === targetId)
    );
  };

  const filteredElements = initialElements.filter(filter);
  const layoutedElements = createGraphLayout(filteredElements);
  return <ReactFlow elements={layoutedElements} />;
};

const Digraph = (props: { filterValue: string }) => {
  const { filterValue } = props;

  return (
    <div className="layoutflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <Builder targetId={filterValue} />
      </ReactFlowProvider>
    </div>
  );
};

export default Digraph;
