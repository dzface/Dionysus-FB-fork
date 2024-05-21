// SortOptions.js
import React from "react";
import styled from "styled-components";
const SelectList = styled.select`
  width: 100px;
  height: 30px;
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: none;
  border-radius: 2px;
  text-align: center;
  & > option {
    border: none;
  }
`;
const SortOptions = ({ sortBy, setSortBy }) => {
  return (
    <div>
      <label>Sort by: </label>
      <SelectList value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">최신등록순</option>
        <option value="price">가격낮은순</option>
        <option value="abv">도수낮은순</option>
        <option value="volume">용량적은순</option>
      </SelectList>
    </div>
  );
};

export default SortOptions;
