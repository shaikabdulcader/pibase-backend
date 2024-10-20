import { FeatureModel } from "./featureSchema.js";
import mongoose from "mongoose";


//GET

const getFeature = async (req, res) => {
  try {
    const features = await FeatureModel.find({
      deletedAt: { $exists: false },
    });

    if (!features || features.length === 0) {
      return res.status(404).json({ message: "No feature data available" });
    }

    res.status(200).json(features);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving feature data", error: error.message });
  }
  };

  //POST

  const createFeature = async (req, res) => {
    try {
      const newFeatureData = await FeatureModel.create({
        title: req.body.title,
        subcontent: req.body.subcontent || [],  
        keyhighlights: req.body.keyhighlights || [],  
      });
  
      const response = newFeatureData.toObject();
  
      if (response.subcontent.length === 0) {
        delete response.subcontent;
      }
      if (response.keyhighlights.length === 0) {
        delete response.keyhighlights;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Feature data", error });
    }
  };

  //PUT

  const updateFeature = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        subcontent: req.body.subcontent || [],  
        keyhighlights: req.body.keyhighlights || [],  
      };
  
      const updatedFeature = await FeatureModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedFeature) {
        return res.status(404).json({ message: "Feature not found" });
      }
  
      const response = updatedFeature.toObject();
  
      if (response.subcontent.length === 0) {
        delete response.subcontent;
      }
      if (response.keyhighlights.length === 0) {
        delete response.keyhighlights;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating Feature data", error });
    }
  };

  //DELETE


  const deleteFeature = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedFeature = await FeatureModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedFeature) {
        return res.status(404).json({ message: "Feature not found" });
      }
  
      res.status(200).json({ deletedAt: updatedFeature.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Feature data", error });
    }
  };


  export { getFeature, createFeature, updateFeature, deleteFeature };