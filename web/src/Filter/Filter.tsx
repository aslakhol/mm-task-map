import React, { useEffect, useState } from "react";

const Filter = () => {
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <>
      <select
        name="filter"
        id="filter"
        onChange={({ target: { value } }) => setFilter(value)}
        defaultValue={filter}
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
    </>
  );
};

export default Filter;
