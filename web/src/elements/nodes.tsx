import React from "react";
import FlowNodeLabel from "./FlowNodeLabel";
import { CleanedTask } from "../types";

export const flowNodes = (tasks: CleanedTask[]) => {
  return tasks.map((task) => flowNode(task));
};

const flowNode = (task: CleanedTask) => {
  return {
    id: task.taskNumber,
    data: { label: <FlowNodeLabel task={task} /> },
    position: { x: 0, y: 0 },
  };
};
