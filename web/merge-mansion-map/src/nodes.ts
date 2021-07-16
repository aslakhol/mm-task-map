import { json } from "./export";

export const getNodesArray = () => {
  const tasks = Object.values(json);

  const cleanedTasks = tasks.map((task) => {
    const cleanedTask = {
      taskNumber: task.Tasknumber.replace("*", ""),
      name: task.Name,
      availableAfter: task["Available after"].replace("*", ""),
      opensTask: task["Opens Task"].replace("*", ""),
      itemsNeeded: task["Items Needed"],
      rewards: task.Rewards,
    };
    return cleanedTask;
  });

  return cleanedTasks;
};

export type Task = {
  taskNumber: string;
  name: string;
  availableAfter: string;
  opensTask: string;
  itemsNeeded: string;
  rewards: string;
};
