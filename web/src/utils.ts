import { Node } from "react-flow-renderer";

export const nodeHasDimension = (el: Node) => el.__rf.width && el.__rf.height;
