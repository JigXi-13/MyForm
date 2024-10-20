import React from "react";
import { useNavigate } from "react-router-dom"; 

import { Button, Typography, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const formData = [
  {
    id: 1,
    title: "Customer Feedback",
    description: "Collect feedback from customers about our services.",
  },
  {
    id: 2,
    title: "Event Registration",
    description: "Register participants for the upcoming event.",
  },
  {
    id: 3,
    title: "Survey Form",
    description: "General survey for product improvements.",
  },
];

const App = () => {

  const navigate = useNavigate();

  const handleCreateNewForm = () => {
    navigate("/create-new-form");  // Navigate to FormCreator component
  };

  return (
    <Box sx={{ padding: "18px 32px" }}>
      {/* Header Section */}
      <Grid
        container
        justifyContent="space-between"
        sx={{ marginBottom: "16px" }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ fontSize: 24, fontWeight: 600 }}
        >
          Manage Forms
        </Typography>
        <Button
          onClick={handleCreateNewForm}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: "#e53935",
            borderRadius: "12px",
          }}
        >
          Create New Form
        </Button>
      </Grid>

      {/* Form Details and Actions Section */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "16px",
          backgroundColor: "#eeeeee",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Form Details
        </Typography>
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Actions
        </Typography>
      </Grid>

      {/* Placeholder for the form list */}
      <Box sx={{ marginTop: "16px" }}>
        {/* Show below UI on initial load */}
        {/* <Typography>No forms created.</Typography> */}
        {formData.map((form) => (
          <Grid
            key={form.id}
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: "16px",
              borderBottom: "2px solid #e0e0e0",
            }}
          >
            {/* Left Side: Form Title and Description */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: 22, fontWeight: 600 }}
              >{`#${form.id} - ${form.title}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {form.description}
              </Typography>
            </Box>

            {/* Right Side: Edit and Delete Icons */}
            <Box>
              <IconButton color="gray">
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="gray">
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default App;
