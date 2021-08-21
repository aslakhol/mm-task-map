import React, { useState } from "react";
import Expanded from "./Expanded";
import Collapsed from "./Collapsed";

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expanded ? (
        <Expanded setExpanded={setExpanded} />
      ) : (
        <Collapsed setExpanded={setExpanded} />
      )}
    </>
  );
};

export default Info;
