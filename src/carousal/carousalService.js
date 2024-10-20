import { CarousalModel } from "./carousalSchema.js";
import mongoose from "mongoose";


//GET

const getCarousal = async (req, res) => {
  try {
    const carousals = await CarousalModel.find({ deletedAt: { $exists: false } });

    if (carousals.length === 0) {
      return res.status(404).json({ message: "No carousal data found" });
    }

    res.status(200).json(carousals);
  } catch (error) {
    console.error("Error retrieving carousal data:", error);
    res.status(500).json({ message: "Error retrieving carousal data", error: error.message });
  }
  };

  //POST

  const createCarousal = async (req, res) => {
    try {
      const newCarousalData = await CarousalModel.create({
        title: req.body.title,
        cardata: req.body.cardata || []
      });
  
      const response = newCarousalData.toObject();
  
      if (response.cardata.every(array => array.length === 0)) {
        delete response.cardata;
      }
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error creating carousal data:", error);
      res.status(500).json({ message: "Error creating carousal data", error: error.message });
    }
  };

  //PUT

  const updateCarousal = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = {
        title: req.body.title,
        cardata: req.body.cardata || []
      };

      const updatedCarousal = await CarousalModel.findByIdAndUpdate(id, updateData, {
        new: true, 
        runValidators: true 
      });
  
      if (!updatedCarousal) {
        return res.status(404).json({ message: "Carousal not found" });
      }
  
      const response = updatedCarousal.toObject();
  
      if (response.cardata.every(array => array.length === 0)) {
        delete response.cardata;
      }
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error updating carousal data:", error);
      res.status(500).json({ message: "Error updating carousal data", error: error.message });
    }
  };

  //DELETE


  const deleteCarousal = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedCarousal = await CarousalModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updateCarousal) {
        return res.status(404).json({ message: "Carousal not found" });
      }
  
      res.status(200).json({ deletedAt: updatedCarousal.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting carousal data", error });
    }
  };


  export { getCarousal, createCarousal, updateCarousal, deleteCarousal };