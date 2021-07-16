import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
  Edge,
  Node,
  Position,
  ConnectionLineType,
  useStoreState,
  Elements,
  useStoreActions,
} from "react-flow-renderer";
import dagre from "dagre";

import _ from "lodash";

// import initialElements from "./initial-elements";

// import "./layouting.css";
import { getElements } from "./elements";

// g.setGraph({
//   marginx: 20,
//   marginy: 20
// });

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 82;

const createGraphLayout = (elements: Elements): Elements => {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  elements.forEach((element) => {
    if (isNode(element)) {
      dagreGraph.setNode(element.id, {
        width: element.__rf?.width || nodeWidth,
        height: element.__rf?.height || nodeHeight,
      });
    } else {
      dagreGraph.setEdge(element.source, element.target);
    }
  });

  console.log(dagreGraph, "alskjdlksjlkjs", elements[0]);

  dagre.layout(dagreGraph);

  return elements.map((element) => {
    if (isNode(element)) {
      const node = dagreGraph.node(element.id);
      element.position = {
        x: node.x - node.width / 2,
        y: node.y - node.height / 2,
      };
    }

    return element;
  });
};

const NodeDebug = () => {
  const elements = useStoreState(
    (state) => [...state.nodes, ...state.edges],
    _.isEqual
  );
  const setElements = useStoreActions((actions) => actions.setElements);

  useEffect(() => {
    if (elements.length) {
      const newElements = createGraphLayout(elements);
      setElements(newElements);
    }
  }, [elements]);
  return null;
};

const LayoutFlow = () => {
  const initialElements = getElements();

  return (
    <div className="layoutflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          elements={initialElements}
          connectionLineType={ConnectionLineType.Bezier}
        />
        <NodeDebug />
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
