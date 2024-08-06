import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ handleInputChange, handleSearch, searchText }) {
  const onKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      onSubmit={(e) => e.preventDefault()} // Prevent form from submitting and causing a page reload
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Search..."
        inputProps={{ "aria-label": "search..." }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch} // Trigger handleSearch on button click
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
