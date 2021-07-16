import React from "react";
import ReactFlow from "react-flow-renderer";
import { getNodesArray, Task } from "./nodes";
import { Edge, isEdge, Node } from "./types";

const FlowLabel = (props: { task: Task }) => {
  const { task } = props;
  return (
    <>
      <div>{task.taskNumber}</div>
      <div>{task.name}</div>
      <div>{task.itemsNeeded}</div>
    </>
  );
};

const Flow = () => {
  const tasks = getNodesArray();
  const nodes: Node[] = tasks.map((task, index) => toFlowNode(task, index));
  const edges: Edge[] = getEdges(tasks);
  const elements: (Node | Edge)[] = [...nodes, ...edges];

  return (
    <div style={{ height: 3500 }}>
      <ReactFlow elements={elements} />
    </div>
  );
};

export default Flow;

const toFlowNode = (task: Task, i: number) => {
  return {
    id: task.taskNumber,
    data: { label: <FlowLabel task={task} /> },
    position: { x: 100, y: 0 + 90 * i },
  };
};

const getEdges = (tasks: Task[]) => {
  const edges = tasks.map((task) => {
    const split = task.opensTask.split(", ");

    const edgesForTask = split.map((edge) => {
      if (edge === "-") return;
      else
        return {
          id: task.taskNumber + "->" + edge,
          source: task.taskNumber,
          target: edge,
        };
    });

    return edgesForTask;
  });
  return edges.flat().filter(isEdge);
};
