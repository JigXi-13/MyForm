import React from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid2";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NotesIcon from "@mui/icons-material/Notes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import StarRateIcon from "@mui/icons-material/StarRate";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const CreateNewForm = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Row: Back Button and Title */}
      <Box sx={{ padding: "18px 32px 0", marginBottom: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{
              backgroundColor: "white",
              marginRight: "8px",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Create Form</Typography>
        </Box>
      </Box>

      {/* Main Content: Left (UI Components) and Right (Form Creation) */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
          padding: "0 32px 18px",
        }}
      >
        {/* Left-side Container (UI Components) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "25%",
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            marginRight: "16px",
            overflow: "auto",
          }}
        >
          <List>
            <ListItem
              sx={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: 4,
                marginBottom: 2
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DragIndicatorIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <TextFieldsIcon />
              </ListItemAvatar>
              <ListItemText primary="Single Line" />
            </ListItem>

            <ListItem
              sx={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: 4,
                marginBottom: 2
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DragIndicatorIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <NotesIcon />
              </ListItemAvatar>
              <ListItemText primary="Multiple Lines / Notes" />
            </ListItem>

            <ListItem
              sx={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: 4,
                marginBottom: 2
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DragIndicatorIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <CheckBoxIcon />
              </ListItemAvatar>
              <ListItemText primary="Checkbox Group" />
            </ListItem>


            <ListItem
              sx={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: 4,
                marginBottom: 2
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DragIndicatorIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <RadioButtonCheckedIcon />
              </ListItemAvatar>
              <ListItemText primary="Radio Group" />
            </ListItem>

            <ListItem
              sx={{
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: 4,
                marginBottom: 2
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DragIndicatorIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <StarRateIcon />
              </ListItemAvatar>
              <ListItemText primary="Ratings" />
            </ListItem>
          </List>
        </Box>

        {/* Right-side Container (Form Creation) */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            backgroundColor: "white",
            overflow: "auto",
          }}
        >
          {/* Form Title and Description Fields in one row */}
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {/* Form Title Field */}
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography variant="body1" gutterBottom>
                Form Title
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter form title"
              />
            </Box>

            {/* Form Description Field */}
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography variant="body1" gutterBottom>
                Form Description
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter form description"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewForm;
