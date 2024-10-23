import React from "react";

// MUI Core components
import { Box, TextField, IconButton } from "@mui/material";

// MUI Icons
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StarRateIcon from "@mui/icons-material/StarRate";

// MUI Lab (for Rating component)
import Rating from "@mui/material/Rating";

// Single Line Textbox Component (Draggable UI)
const RatingsWidget = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "white",
        marginBottom: "16px",
        width: "100%",
      }}
    >
      {/* Top View */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Ratings Icon */}
          <StarRateIcon />
          {/* Editable ratings for Question */}
          <TextField
            variant="standard"
            placeholder="Enter your question here"
            fullWidth
            InputProps={{ disableUnderline: true }}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        {/* Drag Icon on the right */}
        <IconButton edge="end">
          <DragIndicatorIcon />
        </IconButton>
      </Box>

      {/* Bottom View */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Rating
          name="rating"
          defaultValue={0}
          disabled
          sx={{
            "& .MuiRating-icon": {
              color: "rgb(0 0 0 / 87%)",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default RatingsWidget;
