import { json } from "./export";

export const getEdgesArray = () => {
  const taskObjects = Object.values(json);

  const opensTaskArray = taskObjects.map((task) =>
    indexesFromTaskNumbers(task["Opens Task"])
  );

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