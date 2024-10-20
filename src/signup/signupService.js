import { SignupModel } from "./signupSchema.js";
import mongoose from "mongoose";


//GET

const getSignup = async (req, res) => {
  try {
    const signups = await SignupModel.find({ deletedAt: { $exists: false } });

    if (signups.length === 0) {
      return res.status(404).json({ message: "No signup data found" });
    }

    res.status(200).json(signups);
  } catch (error) {
    console.error("Error retrieving signup data:", error);
    res.status(500).json({ message: "Error retrieving signup data", error: error.message });
  }
  };

  //POST

  const createSignup = async (req, res) => {
    try {
      const newSignupData = await SignupModel.create({
        title: req.body.title,
        btntxt: req.body.btntxt || '',
        img: req.body.img || '',
      });
  
      const response = newSignupData.toObject();
  
      if (!response.btntxt) {
        delete response.btntxt;
      }
      if (!response.img) {
        delete response.img;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Signup data", error: error.message });
    }
  };

  //PUT

  const updateSignup = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        btntxt: req.body.btntxt || [],  
        img: req.body.img || [],  
      };
  
      const updatedSignup = await SignupModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedSignup) {
        return res.status(404).json({ message: "signup not found" });
      }
  
      const response = updatedSignup.toObject();
  
      if (response.btntxt.length === 0) {
        delete response.btntxt;
      }
      if (response.img.length === 0) {
        delete response.img;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating signup data", error });
    }
  };

  //DELETE


  const deleteSignup = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedSignup = await SignupModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedSignup) {
        return res.status(404).json({ message: "Signup not found" });
      }
  
      res.status(200).json({ deletedAt: updatedSignup.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Signup data", error });
    }
  };


  export { getSignup, createSignup, updateSignup, deleteSignup };