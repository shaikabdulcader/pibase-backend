import { AboutModel } from "./aboutSchema.js";
import mongoose from "mongoose";


//GET

const getAbout = async (req, res) => {

    try {
      const abouts = await AboutModel.find({
        deletedAt: { $exists: false },
      });
  
      if (abouts.length === 0) {
        return res.status(404).json({ message: "No about data found" });
      }
  
      res.status(200).json(abouts);
    } catch (error) {
      console.error("Error retrieving about data:", error);
      res.status(500).json({ message: "Error retrieving about data", error: error.message });
    }
  };

  //POST

  const createAbout = async (req, res) => {
    try {
      const newAboutData = await AboutModel.create({
        title: req.body.title,
        contents: req.body.contents || [],  
        img: req.body.img || [],  
        howtoreach: req.body.howtoreach || []   
      });
  
      const response = newAboutData.toObject();
  
      if (response.contents.length === 0) {
        delete response.contents;
      }
      if (response.img.length === 0) {
        delete response.img;
      }
      if (response.howtoreach.length === 0) {
        delete response.howtoreach;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating about data", error });
    }
  };

  //PUT

  const updateAbout = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        contents: req.body.contents || [],  
        img: req.body.img || [],  
        howtoreach: req.body.howtoreach || []   
      };
  
      const updatedAbout = await AboutModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedAbout) {
        return res.status(404).json({ message: "About not found" });
      }
  
      const response = updatedAbout.toObject();
  
      if (response.contents.length === 0) {
        delete response.contents;
      }
      if (response.img.length === 0) {
        delete response.img;
      }
      if (response.howtoreach.length === 0) {
        delete response.howtoreach;
      }
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating about data", error });
    }
  };

  //DELETE


  const deleteAbout = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedAbout = await AboutModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedAbout) {
        return res.status(404).json({ message: "About not found" });
      }
  
      res.status(200).json({ deletedAt: updatedAbout.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting about data", error });
    }
  };


  export { getAbout, createAbout, updateAbout, deleteAbout };
  