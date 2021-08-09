import { isEdge, CleanedTask, TaskId } from "../types";

export const flowEdges = (tasks: CleanedTask[]) => {
  const edges = tasks.map((task) => flowEdge(task));
  return edges.flat().filter(isEdge);
};

const flowEdge = (task: CleanedTask) => {
  const edgesForTask = task.opensTask.map((edge) => edgeForTask(edge, task));

  return edgesForTask;
};

const edgeForTask = (edge: TaskId, task: CleanedTask) => {
  return {
    id: task.taskNumber + "->" + edge.id,
    source: task.taskNumber,
    target: edge.id,
  };
};
