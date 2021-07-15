import { json } from "./export";

export const getNodesArray = () => {
  return Object.values(json);
};
