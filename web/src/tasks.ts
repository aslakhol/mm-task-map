import { CleanedTask, Task } from "./types";
import json from "./export.json";

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
    opensTask: task["Opens Task"]?.replace("*", "") || "-",
    itemsNeeded: task["Items Needed"],
    rewards: task.Reward,
  };
  return cleanedTask;
};
