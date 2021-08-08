import { isEdge, CleanedTask } from "./types";

export const flowEdges = (tasks: CleanedTask[]) => {
  const edges = tasks.map((task) => flowEdge(task));
  return edges.flat().filter(isEdge);
};

const flowEdge = (task: CleanedTask) => {
  const tasksOpenedByTask = task.opensTask.split(", ");
  const edgesForTask = tasksOpenedByTask.map((edge) => edgeForTask(edge, task));

  return edgesForTask;
};

const edgeForTask = (edge: string, task: CleanedTask) => {
  if (edge === "-") return;
  else
    return {
      id: task.taskNumber + "->" + edge,
      source: task.taskNumber,
      target: edge,
    };
};
