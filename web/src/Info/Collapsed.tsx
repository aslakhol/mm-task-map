const Collapsed = (props: {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setExpanded } = props;

  const handleClick = () => {
    setExpanded(true);
  };

  return (
    <button className="collapsed info" onClick={handleClick}>
      ?
    </button>
  );
};

export default Collapsed;
