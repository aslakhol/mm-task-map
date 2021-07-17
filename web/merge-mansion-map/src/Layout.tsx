import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  isNode,
  Node,
  Elements,
} from "react-flow-renderer";
import dagre from "dagre";

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
