import React, { useState } from "react";
import { Box, TextField, IconButton, Checkbox, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CheckboxGroupWidget = () => {
  // State to hold the list of checkbox options
  const [options, setOptions] = useState([{ label: "" }]);

  // Handle change in an option's label
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].label = value;
    setOptions(newOptions);
  };

  // Add a new option
  const addOption = () => {
    setOptions([...options, { label: "" }]);
  };

  // Remove an option
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

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
          {/* CheckBox Icon */}
          <CheckBoxIcon />
          {/* Editable TextField for Question */}
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
          flexDirection: "column",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        {options.map((option, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {/* Checkbox Icon (disabled, for visual purposes only) */}
            <Checkbox disabled />

            {/* TextField for option label */}
            <TextField
              variant="standard"
              placeholder={`Option ${index + 1}`}
              fullWidth
              value={option.label}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              InputProps={{ disableUnderline: true }}
            />

            {/* Delete Icon to remove the option */}
            {options.length > 1 && (
              <IconButton
                edge="end"
                onClick={() => removeOption(index)}
                sx={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}

        {/* Add Option Button */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={addOption} color="primary">
            <AddIcon />
          </IconButton>
          <Typography variant="body2" color="primary">
            Add Option
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckboxGroupWidget;
