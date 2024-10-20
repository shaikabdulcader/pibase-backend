import { IntegrationModel } from "./integrationSchema.js";
import mongoose from "mongoose";


//GET

const getIntegration = async (req, res) => {
  try {
    const integrations = await IntegrationModel.find({ deletedAt: { $exists: false } });

    if (integrations.length === 0) {
      return res.status(404).json({ message: "No integration data found" });
    }

    res.status(200).json(integrations);
  } catch (error) {
    console.error("Error retrieving integration data:", error); // Detailed logging
    res.status(500).json({ message: "Error retrieving integration data", error: error.message });
  }
}

  //POST

  const createIntegration = async (req, res) => {
    try {
      const newIntegrationData = await IntegrationModel.create({
        title: req.body.title,
        content: req.body.content || '',
      });
  
      const response = newIntegrationData.toObject();

      if (!response.content) {
        delete response.content;
      }
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Integration data", error: error.message });
    }
  };

  //PUT

  const updateIntegration = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        content: req.body.content || [], 
      };
  
      const updatedIntegration = await IntegrationModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedIntegration) {
        return res.status(404).json({ message: "Integration not found" });
      }
  
      const response = updatedIntegration.toObject();


      if (response.content.length === 0) {
        delete response.content;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating Integration data", error });
    }
  };

  //DELETE


  const deleteIntegration = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedIntegration = await IntegrationModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedIntegration) {
        return res.status(404).json({ message: "Integration not found" });
      }
  
      res.status(200).json({ deletedAt: updatedIntegration.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Integration data", error });
    }
  };


  export { getIntegration, createIntegration, updateIntegration, deleteIntegration };