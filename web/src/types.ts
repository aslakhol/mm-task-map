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
