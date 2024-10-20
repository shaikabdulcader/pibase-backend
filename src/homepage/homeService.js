import { HomeModel } from "./homeSchema.js";
import mongoose from "mongoose";


//GET

const getHome = async (req, res) => {
  try {
    const homes = await HomeModel.find({
      deletedAt: { $exists: false },
    });

    if (!homes || homes.length === 0) {
      return res.status(404).json({ message: "No home data available" });
    }

    res.status(200).json(homes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving home data", error: error.message });
  }
  };

  //POST

  const createHome = async (req, res) => {
    try {
      const newHomeData = await HomeModel.create({
        title: req.body.title,
        content: req.body.content || '',
        btntxt: req.body.btntxt || '',
        img: req.body.img || '',
      });
  
      const response = newHomeData.toObject();

      if (!response.content) {
        delete response.content;
      }
      if (!response.btntxt) {
        delete response.btntxt;
      }
      if (!response.img) {
        delete response.img;
      }
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Home data", error: error.message });
    }
  };

  //PUT

  const updateHome = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {};
        
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.deletedAt) updateData.deletedAt = req.body.deletedAt;
        
        if (req.body.content && req.body.content.length > 0) {
          updateData.content = req.body.content;
        }
        if (req.body.btntxt && req.body.btntxt.length > 0) {
          updateData.btntxt = req.body.btntxt;
        }
        if (req.body.img && req.body.img.length > 0) {
          updateData.img = req.body.img;
        }

        const updatedHome = await HomeModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
    
        if (!updatedHome) {
          return res.status(404).json({ message: "Home not found" });
        }
    
        const response = updatedHome.toObject();
    
        const responseBody = {
          _id: response._id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          __v: response.__v,
          ...(response.title && { title: response.title }),
          ...(response.content && response.content.length > 0 && { content: response.content }),
          ...(response.btntxt && response.btntxt.length > 0 && { btntxt: response.btntxt }),
          ...(response.img && response.img.length > 0 && { img: response.img }),
        };
    
        res.status(200).json(responseBody);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating Home data", error: error.message });
      }
  };

  //DELETE


  const deleteHome = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedHome = await HomeModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedHome) {
        return res.status(404).json({ message: "Home not found" });
      }
  
      res.status(200).json({ deletedAt: updatedHome.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Home data", error });
    }
  };


  export { getHome, createHome, updateHome, deleteHome };