import React from "react";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <Box className="search-row">
      <TextField
        label="Enter City Name"
        variant="outlined"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
        sx={{ width: { xs: "100%", sm: 300 }, backgroundColor: "#fff", borderRadius: 2 }}
      />
      <Button variant="contained" size="large" onClick={onSearch} startIcon={<SearchIcon />}>
        Search
      </Button>
    </Box>
  );
}
