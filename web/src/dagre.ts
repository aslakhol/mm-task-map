import { isNode, Elements } from "react-flow-renderer";
import dagre from "dagre";

const nodeWidth = 172;
const nodeHeight = 82;

export const createGraphLayout = (elements: Elements): Elements => {
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
