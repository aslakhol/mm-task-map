import React from "react";
import { getNodesArray } from "./nodes";
import { Edge, isEdge, Node, CleanedTask } from "./types";

export const getElements = () => {
  const tasks = getNodesArray();
  const nodes: Node[] = tasks.map((task) => toFlowNode(task));
  const edges: Edge[] = getEdges(tasks);
  const elements: (Node | Edge)[] = [...nodes, ...edges];
  return elements;
};

const toFlowNode = (task: CleanedTask) => {
  return {
    id: task.taskNumber,
    data: { label: <Label task={task} /> },
    position: { x: 0, y: 0 },
  };
};

const Label = (props: { task: CleanedTask }) => {
  const { task } = props;
  return (
    <>
      <div>{task.taskNumber}</div>
      <div>{task.name}</div>
      <div>{task.itemsNeeded}</div>
    </>
  );
};

const getEdges = (tasks: CleanedTask[]) => {
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
