import React, { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  isNode,
  Node,
  Elements,
  useStoreState,
  useStoreActions,
} from "react-flow-renderer";
import dagre from "dagre";

import { getElements } from "./elements";

const defaultNodeWidth = 172;
const defaultNodeHeight = 36;

const getLayoutedElements = (elements: Elements): Elements => {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  elements.forEach((element) => {
    if (isNode(element)) {
      dagreGraph.setNode(element.id, {
        width: element.__rf?.width || defaultNodeWidth,
        height: element.__rf?.height || defaultNodeHeight,
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
const initialElements = getElements();

const Builder = () => {
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const setElements = useStoreActions((actions) => actions.setElements);
  const [shouldLayout, setShouldLayout] = useState(true);

  useEffect(() => {
    if (
      shouldLayout &&
      nodes.length &&
      nodes.length > 0 &&
      nodes.every(nodeHasDimension)
    ) {
      const elements = [...nodes, ...edges];
      const elementsWithLayout = getLayoutedElements(elements);

      setElements(elementsWithLayout);
      setShouldLayout(false);
    }
  }, [shouldLayout, nodes, edges, setElements, setShouldLayout]);

  return <ReactFlow elements={initialElements} />;
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
