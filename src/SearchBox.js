import React, { useState } from "react";
import "./Search.css";

const SearchBox = ({ handleSearch }) => {
  const initialState = {
    searchTerm: "",
  };
  const [searchForm, setSearchForm] = useState(initialState);

  const search = (e) => {
    e.preventDefault();
    const term = e.target.parentElement[0].value;
    handleSearch(term);
  };

  return (
    <div className="Search">
      <form onSubmit={search}>
        <input
          type="text"
          name="term"
          placeholder="Enter search term.."
          value={searchForm.term}
        />
        <button onClick={search}>Submit</button>
      </form>
    </div>
  );
};

export default SearchBox;
