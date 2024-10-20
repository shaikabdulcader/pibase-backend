import { AutomateModel } from "./automateSchema.js";
import mongoose from "mongoose";


//GET

const getAutomate = async (req, res) => {
  try {
    const automates = await AutomateModel.find({ deletedAt: { $exists: false } });

    if (automates.length === 0) {
      return res.status(404).json({ message: "No automate data found" });
    }

    res.status(200).json(automates);
  } catch (error) {
    console.error("Error retrieving automate data:", error);
    res.status(500).json({ message: "Error retrieving automate data", error: error.message });
  }
  };

  //POST

  const createAutomate = async (req, res) => {
    try {
      const newAutomatetData = await AutomateModel.create({
        title: req.body.title,
        btntxt: req.body.btntxt || '',
      });
  
      const response = newAutomatetData.toObject();
  
      if (!response.btntxt) {
        delete response.btntxt;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating automate data", error: error.message });
    }
  };

  //PUT

  const updateAutomate = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        btntxt: req.body.btntxt || [],  
      };
  
      const updatedAutomate = await AutomateModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedAutomate) {
        return res.status(404).json({ message: "automate not found" });
      }
  
      const response = updatedAutomate.toObject();
  
      if (response.btntxt.length === 0) {
        delete response.btntxt;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating automate data", error });
    }
  };

  //DELETE


  const deleteAutomate = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }

      const updatedAutomate = await AutomateModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true } 
      );
  
      if (!updatedAutomate) {
        return res.status(404).json({ message: "Automate not found" });
      }
  
      res.status(200).json({ deletedAt: updatedAutomate.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting automate data", error: error.message });
    }
  };
  


  export { getAutomate, createAutomate, updateAutomate, deleteAutomate };