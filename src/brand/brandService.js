import { BrandModel } from "./brandSchema.js";
import mongoose from "mongoose";

//GET

const getBrand = async (req, res) => {
  try {
    const brands = await BrandModel.find({ deletedAt: { $exists: false } });

    if (brands.length === 0) {
      return res.status(404).json({ message: "No brand data found" });
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error retrieving brand data:", error);
    res.status(500).json({ message: "Error retrieving brand data", error: error.message });
  }
  };

  //POST

  const createBrand = async (req, res) => {
    try {
      const newBrandData = await BrandModel.create({
        title: req.body.title,
        content: req.body.content || '',
        btntext: req.body.btntext || '',
      });
  
      const response = newBrandData.toObject();

      if (!response.content) {
        delete response.content;
      }

      if (!response.btntext) {
        delete response.btntext;
      }
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating brand data", error: error.message });
    }
  };

  //PUT

  const updateBrand = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        content: req.body.content || [], 
        btntext: req.body.btntext || [],   
      };
  
      const updatedBrand = await BrandModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedBrand) {
        return res.status(404).json({ message: "brand not found" });
      }
  
      const response = updatedBrand.toObject();


      if (response.content.length === 0) {
        delete response.content;
      }

      if (response.btntext.length === 0) {
        delete response.btntext;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating brand data", error });
    }
  };

  //DELETE


  const deleteBrand = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedBrand = await BrandModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedBrand) {
        return res.status(404).json({ message: "brand not found" });
      }
  
      res.status(200).json({ deletedAt: updatedBrand.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting brand data", error });
    }
  };


  export { getBrand, createBrand, updateBrand, deleteBrand };