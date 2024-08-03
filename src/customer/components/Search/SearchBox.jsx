import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { findProductsBySearchText } from "../../../State/Product/Action";
import { useNavigate } from "react-router-dom";
import("./Search.css");

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  
  const [showButton, setShowButton] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
        console.log("You Enter the keyword 'Enter'");
        
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    await dispatch(findProductsBySearchText(searchText));
    navigate(`/products?search=${encodeURIComponent(searchText)}`)
  };


  useEffect(() => {
    if (searchText.trim()) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [searchText]); // Theo dõi sự thay đổi của searchText

  return (
    <div className="search-box">
      <input
        type="text"
        ref={inputRef}
        value={searchText}
        placeholder="Search..."
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
      {showButton && (
        <button id="searchButton" onClick={handleSearch}>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
      )}
      <span></span>
    </div>
  );
};

export default SearchBox;
