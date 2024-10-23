import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getForms, deleteForm } from "./actions/forms";

import {
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedForm, setSelectedForm] = useState(null); // Form to delete
  const [openDialog, setOpenDialog] = useState(false);

  const forms = useSelector((state) => state.forms); // Getting forms from the Redux store

  React.useEffect(() => {
    dispatch(getForms()); // Fetch all forms when the component loads
  }, [dispatch]);

  const handleCreateNewForm = () => {
    navigate("/create-new-form"); // Navigate to FormCreator component
  };

  const handleEditForm = (formId) => {
    navigate(`/create-new-form?id=${formId}`); // Pass formId as query param for editing
  };

  const handleDeleteForm = (form) => {
    setSelectedForm(form); // Set the form to be deleted
    setOpenDialog(true); // Open the dialog for confirmation
  };

  const handleConfirmDelete = () => {
    if (selectedForm) {
      dispatch(deleteForm(selectedForm._id)); // Call the action to delete the form
    }
    setOpenDialog(false); // Close the dialog
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
    setSelectedForm(null); // Clear selected form
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
        {forms.map((form, index) => (
          <Grid
            key={form._id}
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
              >{`#${index + 1} - ${form.title}`}</Typography>
              <Typography variant="body2" color="textSecondary">
                {form.description}
              </Typography>
            </Box>

            {/* Right Side: Edit and Delete Icons */}
            <Box>
              <IconButton color="gray" onClick={() => handleEditForm(form._id)}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="gray" onClick={() => handleDeleteForm(form)}>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Box>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the form titled{" "}
            <strong>{selectedForm?.title}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
