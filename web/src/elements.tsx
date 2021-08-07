import React from "react";
import ReactFlow from "react-flow-renderer";
import { getNodesArray, Task } from "./nodes";
import { Edge, isEdge, Node } from "./types";

export const getElements = () => {
  const tasks = getNodesArray();
  const nodes: Node[] = tasks.map((task, index) => toFlowNode(task, index));
  const edges: Edge[] = getEdges(tasks);
  const elements: (Node | Edge)[] = [...nodes, ...edges];
  return elements;
};

const toFlowNode = (task: Task, i: number) => {
  return {
    id: task.taskNumber,
    data: { label: <Label task={task} /> },
    position: { x: 0, y: 0 },
  };
};

const Label = (props: { task: Task }) => {
  const { task } = props;
  return (
    <>
      <div>{task.taskNumber}</div>
      <div>{task.name}</div>
      <div>{task.itemsNeeded}</div>
    </>
  );
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
