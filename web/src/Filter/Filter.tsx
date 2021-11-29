import React, { Dispatch } from "react";

type Props = {
  filterValue: string;
  setFilterValue: Dispatch<React.SetStateAction<string>>;
};

const Filter = (props: Props) => {
  const { filterValue, setFilterValue } = props;

  return (
    <select
      name="filterValue"
      id="filterValue"
      onChange={({ target: { value } }) => setFilterValue(value)}
      defaultValue={filterValue}
      className="filter"
    >
      <option value="all">All</option>
      <option value="1">1 The Grand Drive</option>
      <option value="2">2 Mansion Stairs</option>
      <option value="3">3 Tranquillity Terrace</option>
      <option value="4">4 Frog Pond Falls</option>
      <option value="5">5 Garage</option>
      <option value="6">6 Beach House</option>
      <option value="7">7 Side Entrance</option>
      <option value="8">8 Harbour</option>
      <option value="9">9 Flower Garden</option>
      <option value="10">10 Stone Garden</option>
      <option value="11">11 Pool Area</option>
      <option value="12">12 The Grand Drive 2</option>
      <option value="13">13 Fortress</option>
      <option value="14">14 Plaza</option>
      <option value="15">15 Pier</option>
      <option value="16">16 The Old Well</option>
    </select>
  );
};

export default Filter;
