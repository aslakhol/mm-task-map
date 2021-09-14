import { CleanedTask, Task, TaskId } from "../types";
import json from "../export.json";

const taskNumberRegex = /(\d+)[-.](\d+)/g;

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
    taskNumber: taskNumber(task.Tasknumber),
    name: task.Name,
    availableAfter: task["Available after"] || "-".replace("*", ""),
    opensTask: opensTask(task["Opens Task"] || "-"),
    itemsNeeded: task["Items Needed"],
    rewards: task.Reward,
  };
  return cleanedTask;
};

const taskNumber = (taskNumberString: string): TaskId => {
  const matches = taskNumberString.matchAll(taskNumberRegex);
  const foundNumbers = Array.from(matches);

  if (foundNumbers.length > 1) {
    throw new Error("More than one task number found");
  }
  return taskId(foundNumbers[0][1], foundNumbers[0][2]);
};

const opensTask = (opensTaskString: string): TaskId[] => {
  const matches = opensTaskString.matchAll(taskNumberRegex);
  const foundNumbers = Array.from(matches);

  const taskIds = foundNumbers.map((foundNumber) =>
    taskId(foundNumber[1], foundNumber[2])
  );

  return taskIds;
};

const taskId = (area: string, task: string): TaskId => ({
  area: parseInt(area),
  task: parseInt(task),
  id: `${area}-${task}`,
});
