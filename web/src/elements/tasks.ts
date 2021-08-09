import { CleanedTask, Task, TaskId } from "../types";
import json from "../export.json";

export const getTasks = () => {
  const tasks: Task[] = json;
  const cleanedTasks = cleanTasks(tasks);

  return cleanedTasks;
};

const cleanTasks = (tasks: Task[]): CleanedTask[] => {
  const cleanedTasks = tasks.map((task) => {
    return cleanTask(task);
  });
  return cleanedTasks;
};

const cleanTask = (task: Task): CleanedTask => {
  const cleanedTask = {
    taskNumber: task.Tasknumber.replace("*", ""),
    name: task.Name,
    availableAfter: task["Available after"].replace("*", ""),
    opensTask: opensTask(task["Opens Task"] || "-"),
    itemsNeeded: task["Items Needed"],
    rewards: task.Reward,
  };
  return cleanedTask;
};

const opensTask = (opensTaskString: string): TaskId[] => {
  const taskNumberRegex = /(\d+)[-.](\d+)/g;
  const taskIds: TaskId[] = [];

  const matches = opensTaskString.matchAll(taskNumberRegex);

  for (const match of matches) {
    taskIds.push(taskId(match[1], match[2]));
  }

  return taskIds;
};

const taskId = (area: string, task: string): TaskId => ({
  area: parseInt(area),
  task: parseInt(task),
  id: `${area}-${task}`,
});
