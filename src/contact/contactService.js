import { ContactModel } from "./contactSchema.js";
import mongoose from "mongoose";


//GET

const getContact = async (req, res) => {
  try {
    const contacts = await ContactModel.find({
      deletedAt: { $exists: false },
    });

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contact data found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error retrieving contact data:", error);
    res.status(500).json({ message: "Error retrieving contact data", error: error.message });
  }
  };

  //POST

  const createContact = async (req, res) => {
    try {
      const newContactData = await ContactModel.create({
        title: req.body.title,
        form: req.body.form || [],  
      });
  
      const response = newContactData.toObject();
  
      if (response.form.length === 0) {
        delete response.form;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating contact data", error });
    }
  };

  //PUT

  const updateContact = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        form: req.body.form || [],  
      };
  
      const updatedContact = await ContactModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      const response = updatedContact.toObject();
  
      if (response.form.length === 0) {
        delete response.form;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating contact data", error });
    }
  };

  //DELETE


  const deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedContact = await ContactModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
  
      res.status(200).json({ deletedAt: updatedContact.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting contact data", error });
    }
  };


  export { getContact, createContact, updateContact, deleteContact };