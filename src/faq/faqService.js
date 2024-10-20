import { FaqModel } from "./faqSchema.js";
import mongoose from "mongoose";


//GET

const getFaq = async (req, res) => {
  try {
    const faqs = await FaqModel.find({ deletedAt: { $exists: false } });

    if (faqs.length === 0) {
      return res.status(404).json({ message: "No FAQ data found" });
    }

    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error retrieving FAQ data:", error);
    res.status(500).json({ message: "Error retrieving FAQ data", error: error.message });
  }
  };

  //POST

  const createFaq = async (req, res) => {
    try {
      const newFaqData = await FaqModel.create({
        title: req.body.title,
        accordion: req.body.accordion || [],  
      });
  
      const response = newFaqData.toObject();
  
      if (response.accordion.length === 0) {
        delete response.accordion;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Faq data", error });
    }
  };

  //PUT

  const updateFaq = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updateData = {
        title: req.body.title,
        deletedAt: req.body.deletedAt,
        accordion: req.body.accordion || [],  
      };
  
      const updatedFaq = await FaqModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );
  
      if (!updatedFaq) {
        return res.status(404).json({ message: "Faq not found" });
      }
  
      const response = updatedFaq.toObject();
  
      if (response.accordion.length === 0) {
        delete response.accordion;
      }
      
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating Faq data", error });
    }
  };

  //DELETE


  const deleteFaq = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedFaq = await FaqModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedFaq) {
        return res.status(404).json({ message: "Faq not found" });
      }
  
      res.status(200).json({ deletedAt: updatedFaq.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Faq data", error });
    }
  };


  export { getFaq, createFaq, updateFaq, deleteFaq };