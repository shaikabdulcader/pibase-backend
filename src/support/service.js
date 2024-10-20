import { SupportModel } from "./schema.js";
import mongoose from "mongoose";

//GET

const getSupport = async (req, res) => {

  try {
    const supports = await SupportModel.find({
      deletedAt: { $exists: false }
    });

    if (supports.length === 0) {
      return res.status(404).json({ message: "No support data found" });
    }

    res.status(200).json(supports);
  } catch (error) {
    console.error('Error retrieving support data:', error);
    res.status(500).json({ message: "Error retrieving support data", error: error.message });
  }
};

//POST

const createSupport = async (req, res) => {
  try {
    const newSupportData = await SupportModel.create({
      title: req.body.title,
      help: req.body.help || [],  
      kind: req.body.kind || []   
    });

    const response = newSupportData.toObject();

    if (response.help.length === 0) {
      delete response.help;
    }
    if (response.kind.length === 0) {
      delete response.kind;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error creating support data", error });
  }
};


//PUT



const updateSupport = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      deletedAt: req.body.deletedAt,
      help: req.body.help || [],  
      kind: req.body.kind || []   
    };

    const updatedSupport = await SupportModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedSupport) {
      return res.status(404).json({ message: "Support not found" });
    }

    const response = updatedSupport.toObject();

    if (response.help.length === 0) {
      delete response.help;
    }
    if (response.kind.length === 0) {
      delete response.kind;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating support data", error });
  }
};



//DELETE

const deleteSupport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const updatedSupport = await SupportModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!updatedSupport) {
      return res.status(404).json({ message: "Support not found" });
    }

    res.status(200).json({ deletedAt: updatedSupport.deletedAt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting support data", error });
  }
};

export { getSupport, createSupport, updateSupport, deleteSupport };
