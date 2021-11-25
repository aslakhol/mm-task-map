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
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
    </select>
  );
};

export default Filter;
