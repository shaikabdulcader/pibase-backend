import { PosbytzModel } from "./posbytzSchema.js";
import mongoose from "mongoose";

//GET

const getPosbytz = async (req, res) => {
  try {
    const posbytzRecords = await PosbytzModel.find({ deletedAt: { $exists: false } });

    if (posbytzRecords.length === 0) {
      return res.status(404).json({ message: "No Posbytz data found" });
    }

    res.status(200).json(posbytzRecords);
  } catch (error) {
    console.error("Error retrieving posbytz data:", error); // Detailed logging
    res.status(500).json({ message: "Error retrieving posbytz data", error: error.message });
  }
  };

  //POST

  const createPosbytz = async (req, res) => {
    try {
        const newPosbytzData = await PosbytzModel.create({
          title: req.body.title,
          title2: req.body.title2,
          title3: req.body.title3,
          erpcard: req.body.erpcard || [] 
        });
    
        const response = newPosbytzData.toObject();
    
        if (!response.erpcard || response.erpcard.length === 0) {
          delete response.erpcard;
        }
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ message: "Error creating Posbytz data", error: error.message });
      }
  };

  //PUT

  const updatePosbytz = async (req, res) => {
    try {
        const { id } = req.params;
    
        const updateData = {
          title: req.body.title,
          deletedAt: req.body.deletedAt,
          title2: req.body.title2 || '',
          title3: req.body.title3 || '',
          erpcard: req.body.erpcard || [],
        };
    
        const updatedPosbytz = await PosbytzModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
    
        if (!updatedPosbytz) {
          return res.status(404).json({ message: "posbytz not found" });
        }
    
        const response = updatedPosbytz.toObject();
    
        const orderedResponse = {
          title: response.title,
          ...(response.title2 && { title2: response.title2 }),
          ...(response.title3 && { title3: response.title3 }),
          ...(response.erpcard.length > 0 && { erpcard: response.erpcard }),
          _id: response._id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          __v: response.__v,
        };
    
        res.status(200).json(orderedResponse);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating posbytz data", error });
      }
  };

  //DELETE


  const deletePosbytz = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedPosbytz = await PosbytzModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedPosbytz) {
        return res.status(404).json({ message: "Posbytz not found" });
      }
  
      res.status(200).json({ deletedAt: updatedPosbytz.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Posbytz data", error });
    }
  };


  export { getPosbytz, createPosbytz, updatePosbytz, deletePosbytz };