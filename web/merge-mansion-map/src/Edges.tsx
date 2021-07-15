import React from "react";
import { json } from "./export";
const Edges = () => {
  const tasks = Object.values(json);

  tasks.map((task) => console.log(indexFromTaskNumber(task.Tasknumber)));
  return <>Edges</>;
};

export default Edges;

const indexFromTaskNumber = (taskNumber: string) => {
  const withoutStar = taskNumber.replace("*", "");
  const localTaskNumber = withoutStar.split("-")[1];
  const index = parseInt(localTaskNumber) - 1;
  return index;
};
