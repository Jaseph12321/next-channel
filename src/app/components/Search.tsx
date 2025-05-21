"use client";
import React, { useState } from "react";
import "./style/search.scss";

type SearchProps = {
  searchResult: string;
  placeholder?: string;
  onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({
  placeholder = "search channel....",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ("Enter" === e.key) handleSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
