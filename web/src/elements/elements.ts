import { Edge, Node } from "../types";
import { flowNodes } from "./nodes";
import { flowEdges } from "./edges";
import { getTasks } from "./tasks";

export const getElements = () => {
  const tasks = getTasks();
  const nodes: Node[] = flowNodes(tasks);
  const edges: Edge[] = flowEdges(tasks);
  const elements: (Node | Edge)[] = [...nodes, ...edges];
  return elements;
};
