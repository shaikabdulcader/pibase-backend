import { CareerModel } from "./careerSchema.js";
import mongoose from "mongoose";

//GET

const getCareer = async (req, res) => {
  try {
    const careers = await CareerModel.find({
      deletedAt: { $exists: false },
    });

    if (careers.length === 0) {
      return res.status(404).json({ message: "No career data found" });
    }

    res.status(200).json(careers);
  } catch (error) {
    console.error("Error retrieving career data:", error);
    res.status(500).json({ message: "Error retrieving career data", error: error.message });
  }
};

//POST

const createCareer = async (req, res) => {
  try {
    const newCareerData = await CareerModel.create({
      title: req.body.title,
      main: req.body.main || [],
      posbytz: req.body.posbytz || [],
      card: req.body.card || [],
      core: req.body.core || [],
      worklife: req.body.worklife || [],
      positions: req.body.positions || [],
      principle: req.body.principle || [],
      fun: req.body.fun || [],
    });

    const response = newCareerData.toObject();

    if (response.main.length === 0) {
      delete response.main;
    }
    if (response.posbytz.length === 0) {
      delete response.posbytz;
    }
    if (response.card.length === 0) {
      delete response.card;
    }
    if (response.core.length === 0) {
      delete response.core;
    }
    if (response.worklife.length === 0) {
      delete response.worklife;
    }
    if (response.positions.length === 0) {
      delete response.positions;
    }
    if (response.principle.length === 0) {
      delete response.principle;
    }
    if (response.fun.length === 0) {
      delete response.fun;
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error creating career data", error });
  }
};

//PUT

const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      deletedAt: req.body.deletedAt,
      main: req.body.main || [],
      posbytz: req.body.posbytz || [],
      card: req.body.card || [],
      core: req.body.core || [],
      worklife: req.body.worklife || [],
      positions: req.body.positions || [],
      principle: req.body.principle || [],
      fun: req.body.fun || [],
    };

    const updatedCareer = await CareerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCareer) {
      return res.status(404).json({ message: "Career not found" });
    }

    const response = updatedCareer.toObject();

    // object updation condition

    if (response.main.length === 0) {
      delete response.main;
    }
    if (response.posbytz.length === 0) {
      delete response.posbytz;
    }
    if (response.card.length === 0) {
      delete response.card;
    }
    if (response.core.length === 0) {
      delete response.core;
    }
    if (response.worklife.length === 0) {
      delete response.worklife;
    }
    if (response.positions.length === 0) {
      delete response.positions;
    }
    if (response.principle.length === 0) {
      delete response.principle;
    }
    if (response.fun.length === 0) {
      delete response.fun;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating career data", error });
  }
};

//DELETE

const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const updatedCareer = await CareerModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!updatedCareer) {
      return res.status(404).json({ message: "Career not found" });
    }

    res.status(200).json({ deletedAt: updatedCareer.deletedAt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting career data", error });
  }
};

export { getCareer, createCareer, updateCareer, deleteCareer };
