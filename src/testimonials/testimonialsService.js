import { TestimonialsModel } from "./testimonialsSchema.js";
import mongoose from "mongoose";


//GET

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialsModel.find({ deletedAt: { $exists: false } });

    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials data found" });
    }

    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error retrieving testimonials data:", error);
    res.status(500).json({ message: "Error retrieving testimonials data", error: error.message });
  }
  };

  //POST

  const createTestimonials = async (req, res) => {
    try {
      const newTestimonialsData = await TestimonialsModel.create({
        title: req.body.title,
        card: req.body.card || [],  
      });
  
      const response = newTestimonialsData.toObject();
  
      if (response.card.length === 0) {
        delete response.card;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating testimonials data", error });
    }
  };

  //PUT

  const updateTestimonials = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        card: req.body.card || [],  
      };
  
      const updatedTestimonials = await TestimonialsModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedTestimonials) {
        return res.status(404).json({ message: "Testimonials not found" });
      }
  
      const response = updatedTestimonials.toObject();
  
      if (response.card.length === 0) {
        delete response.card;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating testimonials data", error });
    }
  };

  //DELETE


  const deleteTestimonials = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedTestimonials = await TestimonialsModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedTestimonials) {
        return res.status(404).json({ message: "Testimonials not found" });
      }
  
      res.status(200).json({ deletedAt: updatedTestimonials.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting testimonials data", error });
    }
  };


  export { getTestimonials, createTestimonials, updateTestimonials, deleteTestimonials };