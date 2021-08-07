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
  taskNumber: string;
  name: string;
  availableAfter: string;
  opensTask: string;
  itemsNeeded: string;
  rewards: string;
};
