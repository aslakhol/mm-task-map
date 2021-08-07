import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  isNode,
  Node,
  Elements,
} from "react-flow-renderer";
import dagre from "dagre";

import { getElements } from "./elements";

const nodeWidth = 172;
const nodeHeight = 82;

const createGraphLayout = (elements: Elements): Elements => {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  elements.forEach((element) => {
    if (isNode(element)) {
      console.log("isnode");

      dagreGraph.setNode(element.id, {
        width: element.__rf?.width || nodeWidth,
        height: element.__rf?.height || nodeHeight,
      });
    } else {
      console.log("is not node");

      dagreGraph.setEdge(element.source, element.target);
    }
  });

  console.log("dagreGraph", dagreGraph);
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

const nodeHasDimension = (el: Node) => el.__rf.width && el.__rf.height;

const Builder = () => {
  const initialElements = getElements();
  const layoutedElements = createGraphLayout(initialElements);
  return <ReactFlow elements={layoutedElements} />;
};

const LayoutFlow = () => {
  return (
    <div className="layoutflow" style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <Builder />
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
