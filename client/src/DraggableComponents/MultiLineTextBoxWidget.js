import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import NotesIcon from "@mui/icons-material/Notes";

// MUI Core components
import { Box, TextField, IconButton } from "@mui/material";

// MUI Icons
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import TextFieldsIcon from "@mui/icons-material/TextFields";

// Single Line Textbox Component (Draggable UI)
const MultiLineTextBoxWidget = () => {
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
          {/* TextField Icon */}
          <NotesIcon />
          {/* Editable TextField for Question */}
          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder="Enter your question here"
            fullWidth
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
        {/* Non-editable Short Answer Input */}
        <TextField
          multiline
          variant="standard"
          fullWidth
          disabled
          placeholder="MultiLine text / Paragraph"
          sx={{
            "& .MuiInputBase-root": {
              borderBottom: "1px solid #000",
            },
            "& .MuiInputBase-input": {
              "-webkit-text-fill-color": "rgba(0, 0, 0, 0.87) !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default MultiLineTextBoxWidget;
