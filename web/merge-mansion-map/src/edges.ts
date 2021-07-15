import { json } from "./export";

export const getEdgesArray = () => {
  const taskObjects = Object.values(json);

  const opensTaskArray = taskObjects.map((task) =>
    indexesFromTaskNumbers(task["Opens Task"])
  );

  // opensTaskArray.map((tasks, i) => {
  //   let s = "";
  //   tasks.map((task) => {
  //     if (task) {
  //       s += taskObjects[task].Tasknumber + ", ";
  //     } else {
  //     }
  //   });
  //   console.log(taskObjects[i].Tasknumber + " leads to " + s);
  // });

  return opensTaskArray;
};

const indexesFromTaskNumbers = (taskNumbers: string) => {
  const splitNumbers = taskNumbers.split(",");
  const indexes = splitNumbers.map((number) => indexFromTaskNumber(number));
  return indexes;
};

const indexFromTaskNumber = (taskNumber: string) => {
  const withoutStar = taskNumber.replace("*", "");
  const localTaskNumber = withoutStar.split("-")[1];
  const index = parseInt(localTaskNumber) - 1;
  return index;
};
