import mongoose from "mongoose";
import Form from "../models/Forms.js";

// Get all forms
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

// Get form by id
export const getForm = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

// Create a new form
export const createForm = async (req, res) => {
  const { title, description } = req.body;
  try {
    const form = new Form({ title, description });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error creating form", error });
  }
};

// Update a form by ID
export const updateForm = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No form with id: ${id}`);
    const updatedForm = { title, description, _id: id };
    const form = await Form.findByIdAndUpdate(
      id,
      updatedForm,
      { new: true }
    );
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error updating form", error });
  }
};

// Delete a form by ID
export const deleteForm = async (req, res) => {
    console.log('deleteForm', req.params)
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No form with id: ${id}`);
      await Form.findByIdAndDelete(
        id,
      );
      res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: "Error deleting form", error });
    }
};
