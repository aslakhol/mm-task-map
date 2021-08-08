import React from "react";
import { CleanedTask } from "./types";

const FlowNodeLabel = (props: { task: CleanedTask }) => {
  const { task } = props;
  return (
    <>
      <div>{task.taskNumber}</div>
      <div>{task.name}</div>
      <div>{task.itemsNeeded}</div>
    </>
  );
};

export default FlowNodeLabel;
