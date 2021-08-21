import React from "react";

const Expanded = (props: {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setExpanded } = props;
  const handleClick = () => setExpanded(false);
  return (
    <div className="expanded info" onClick={handleClick}>
      <strong>Merge Mansion Task Map</strong>
      <p>This is a map of all the tasks in merge mansion.</p>
      <p>Click and drag to navigate through the map, scroll to zoom.</p>
      <strong>Data</strong>
      <p>
        The data used as a basis for the map is gathered from the{" "}
        <a
          href="https://merge-mansion.fandom.com/wiki/Tasks"
          target="_blank"
          rel="noreferrer"
        >
          fan-wiki
        </a>
        .
      </p>
      <p>
        There are many mistakes in the current map, and if you find any please
        update the wiki-pages.
      </p>
      <p>
        To update from the wiki I have to run some commands manually, but I'll
        automate this if it becomes a big burden.
      </p>
      <strong>Source code</strong>
      <p>
        If you wish to contribute, or take a look at the source code, it is
        hosted on{" "}
        <a
          href="https://github.com/aslakhol/mm-task-map"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </p>
      <p>
        If you have any comments, feature-requests or other feedback please open
        an issue on github or send me a message on reddit at{" "}
        <a
          href="https://www.reddit.com/user/aslakhol"
          target="_blank"
          rel="noreferrer"
        >
          /u/aslakhol
        </a>
      </p>
    </div>
  );
};

export default Expanded;
