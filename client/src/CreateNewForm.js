import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// MUI Core components
import {
  Button,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NotesIcon from "@mui/icons-material/Notes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import StarRateIcon from "@mui/icons-material/StarRate";

// MUI Lab (for Rating component)
import SingleLineTextBoxWidget from "./DraggableComponents/SingleLineTextBoxWidget";
import MultiLineTextBoxWidget from "./DraggableComponents/MultiLineTextBoxWidget";
import CheckboxGroupWidget from "./DraggableComponents/CheckboxGroupWidget";
import RadioButtonGroupComponent from "./DraggableComponents/RadioButtonGroupWidget";
import RatingsWidget from "./DraggableComponents/RatingsWidget";
import { createForm, updateForm } from "./actions/forms";

// Constants for Drag-and-Drop
const ItemTypes = {
  COMPONENT: "component",
  DROPPED_COMPONENT: "dropped_component",
};

// Draggable component
const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <ListItem
      ref={drag}
      sx={{
        padding: "12px",
        border: "2px solid #e0e0e0",
        borderRadius: 4,
        marginBottom: 2,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      secondaryAction={
        <IconButton edge="end">
          <DragIndicatorIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>{component.icon}</ListItemAvatar>
      <ListItemText primary={component.name} />
    </ListItem>
  );
};

// Component Renderer based on type
const ComponentRenderer = ({ component }) => {
  switch (component.type) {
    case "text":
      return <SingleLineTextBoxWidget />;
    case "textarea":
      return <MultiLineTextBoxWidget />;

    case "radio":
      return <RadioButtonGroupComponent />;

    case "checkbox":
      return <CheckboxGroupWidget />;

    case "rating":
      return <RatingsWidget />;
    default:
      return null;
  }
};

// Droppable and draggable component in the form creation area
const DraggableFormComponent = ({ component, index, moveComponent }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.DROPPED_COMPONENT,
    hover(item) {
      if (item.index !== index) {
        moveComponent(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DROPPED_COMPONENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      sx={{
        padding: "12px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "12px",
        backgroundColor: "white",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <ComponentRenderer component={component} />
    </Box>
  );
};

// Droppable container
const DroppableContainer = ({
  onDrop,
  moveComponent,
  components,
  formData,
  setFormData,
  currentId,
  handleSubmit
}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item) => onDrop(item.component),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        flexGrow: 1,
        padding: "16px",
        borderRadius: "8px",
        // border: "1px solid #e0e0e0",
        // backgroundColor: "white",
        overflow: "auto",
      }}
    >
      {/* Form Title and Description */}
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          margin: "16px 0px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography variant="body1" gutterBottom>
            Form Title
          </Typography>
          <TextField
            sx={{ backgroundColor: "white" }}
            fullWidth
            variant="outlined"
            placeholder="Enter form title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography variant="body1" gutterBottom>
            Form Description
          </Typography>
          <TextField
            sx={{ backgroundColor: "white" }}
            fullWidth
            variant="outlined"
            placeholder="Enter form description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Box>
        <Button sx={{'&.MuiButton-root': {
            margin: '28px 0px 2px 0px',
        }}} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          {currentId ? "Update Form" : "Create Form"}
        </Button>
      </Box>

      {/* Dynamically added form components */}
      <Box>
        {components.length > 0 ? (
          components.map((component, index) => (
            <DraggableFormComponent
              key={index}
              component={component}
              index={index}
              moveComponent={moveComponent}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Drag and drop components here to build your form
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const CreateNewForm = () => {
  const [formComponents, setFormComponents] = useState([]);

  // Available UI components that can be dragged
  const availableComponents = [
    { name: "Single Line", icon: <TextFieldsIcon />, type: "text" },
    { name: "Multiple Lines / Notes", icon: <NotesIcon />, type: "textarea" },
    { name: "Checkbox Group", icon: <CheckBoxIcon />, type: "checkbox" },
    {
      name: "Radio Group",
      icon: <RadioButtonCheckedIcon />,
      type: "radio",
    },
    { name: "Ratings", icon: <StarRateIcon />, type: "rating" },
  ];

  // Handle drop event
  const handleDrop = (component) => {
    setFormComponents((prevComponents) => [...prevComponents, component]);
  };

  // Move component within the form creation area for reordering
  const moveComponent = (fromIndex, toIndex) => {
    const updatedComponents = [...formComponents];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);
    setFormComponents(updatedComponents);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [currentId, setCurrentId] = useState(null);

  const forms = useSelector((state) => state.forms);

  // Extract form ID from URL (for editing)
  const formId = new URLSearchParams(location.search).get("id");

  // Load form data for editing
  useEffect(() => {
    if (formId) {
      const formToEdit = forms.find((form) => form._id === formId);
      if (formToEdit) {
        setFormData({
          title: formToEdit.title,
          description: formToEdit.description,
        });
        setCurrentId(formId);
      }
    }
  }, [formId, forms]);

  // Handle form submission (either create or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateForm(currentId, formData));
    } else {
      dispatch(createForm(formData));
    }

    navigate("/"); // Redirect to the main page after creating/updating the form
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Top Row: Back Button and Title */}
        <Box sx={{ padding: "18px 32px 0", marginBottom: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => navigate("/")}
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
              {availableComponents.map((component, index) => (
                <DraggableComponent key={index} component={component} />
              ))}
            </List>
          </Box>

          {/* Right-side Container (Form Creation) */}
          <DroppableContainer
            onDrop={handleDrop}
            components={formComponents}
            moveComponent={moveComponent}
            formData={formData}
            setFormData={setFormData}
            currentId={currentId}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </DndProvider>
  );
};

export default CreateNewForm;
