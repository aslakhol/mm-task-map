import json from "./export.json";
import { Task, CleanedTask } from "./types";

const typedJson: Task[] = json;

export const getNodesArray = () => {
  const tasks = Object.values(typedJson);
  const cleanedTasks = cleanTasks(tasks);

  return cleanedTasks;
};

const cleanTasks = (tasks: Task[]): CleanedTask[] => {
  const cleanedTasks = tasks.map((task) => {
    const cleanedTask = {
      taskNumber: task.Tasknumber.replace("*", ""),
      name: task.Name,
      availableAfter: task["Available after"].replace("*", ""),
      opensTask: task["Opens Task"]?.replace("*", "") || "-",
      itemsNeeded: task["Items Needed"],
      rewards: task.Reward,
    };
    return cleanedTask;
  });
  return cleanedTasks;
};
