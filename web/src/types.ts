export type Edge = {
  id: string;
  source: string;
  target: string;
};

export type Node = {
  id: string;
  data: {
    label: JSX.Element;
  };
  position: {
    x: number;
    y: number;
  };
};

export const isEdge = (e: Edge | undefined): e is Edge => {
  return !!e;
};

export type Task = {
  Tasknumber: string;
  Name: string;
  "Available after": string;
  "Opens Task": string | null;
  "Items Needed": string;
  Reward: string;
  "Sub Area"?: string | null;
};

export type CleanedTask = {
  taskNumber: TaskId;
  name: string;
  availableAfter: string;
  opensTask: TaskId[];
  itemsNeeded: string;
  rewards: string;
};

export type TaskId = {
  area: number;
  task: number;
  id: string;
};
