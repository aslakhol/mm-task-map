import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
  Edge,
  Node,
  Position,
  ConnectionLineType,
} from "react-flow-renderer";
import dagre from "dagre";

// import initialElements from "./initial-elements";

// import "./layouting.css";
import { getElements } from "./elements";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements: (Node<any> | Edge<any>)[]) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = Position.Top;
      el.sourcePosition = Position.Bottom;
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const initialElements = getElements();

const LayoutFlow = () => {
  const layoutedElements = getLayoutedElements(initialElements);

  return (
    <div className="layoutflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          elements={layoutedElements}
          connectionLineType={ConnectionLineType.Bezier}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
