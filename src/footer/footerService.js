import { FooterModel } from "./footerSchema.js";
import mongoose from "mongoose";


//GET

const getFooter = async (req, res) => {
  try {

    const footers = await FooterModel.find();

    if (footers.length === 0) {
      return res.status(404).json({
        message: "No footers found",
        error: "No footer data available.",
      });
    }

    const response = footers.map((footer) => {
      const footerResponse = {};

      if (footer.title) footerResponse.title = footer.title;
      if (footer.logo) footerResponse.logo = footer.logo;
      if (footer.para1) footerResponse.para1 = footer.para1;
      if (footer.para2) footerResponse.para2 = footer.para2;
      if (footer.findus) footerResponse.findus = footer.findus;

      if (footer.companydetails && Object.keys(footer.companydetails).length > 0) {
        const filteredCompanyDetails = Object.fromEntries(
          Object.entries(footer.companydetails).filter(([key, value]) => value.length > 0)
        );

        if (Object.keys(filteredCompanyDetails).length > 0) {
          footerResponse.companydetails = filteredCompanyDetails;
        }
      }

      return footerResponse;
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving footer data:", error);
    res.status(500).json({ message: "Error retrieving footer data", error: error.message });
  }
};


  //POST

  const createFooter = async (req, res) => {
    try {
      const { title, logo = '', para1 = '', para2 = '', companydetails = {}, findus = '' } = req.body;
  
      if (!title) {
        return res.status(400).json({
          message: "Missing required fields",
          error: "Please provide the title.",
        });
      }
  
      const newFooterData = await FooterModel.create({
        title,
        logo,
        para1,
        para2,
        companydetails,
        findus,
      });
  
      const response = newFooterData.toObject();
  
      if (!response.logo) {
        delete response.logo;
      }
      if (!response.para1) {
        delete response.para1;
      }
      if (!response.para2) {
        delete response.para2;
      }
      if (!response.findus) {
        delete response.findus;
      }
  
      if (!response.companydetails || Object.values(response.companydetails).every(section => section.length === 0)) {
        delete response.companydetails;
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating footer data", error: error.message });
    }
  };
  
  
  //PUT

  const updateFooter = async (req, res) => {
    try {
      const { title, logo = '', para1 = '', para2 = '', companydetails = {}, findus = '' } = req.body;
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          message: "Missing ID",
          error: "Please provide the ID of the footer to update.",
        });
      }
  
      const updatedFooter = await FooterModel.findByIdAndUpdate(
        id,
        { title, logo, para1, para2, companydetails, findus },
        { new: true, runValidators: true }
      );
  
      if (!updatedFooter) {
        return res.status(404).json({
          message: "Footer not found",
          error: "No footer found with the provided ID.",
        });
      }
  
      const response = {};
  
      if (updatedFooter.title) response.title = updatedFooter.title;
      if (updatedFooter.logo) response.logo = updatedFooter.logo;
      if (updatedFooter.para1) response.para1 = updatedFooter.para1;
      if (updatedFooter.para2) response.para2 = updatedFooter.para2;
      if (updatedFooter.findus) response.findus = updatedFooter.findus;
  
      if (updatedFooter.companydetails && Object.keys(updatedFooter.companydetails).length > 0) {

        const filteredCompanyDetails = Object.fromEntries(
          Object.entries(updatedFooter.companydetails).filter(([key, value]) => value.length > 0)
        );
  
        if (Object.keys(filteredCompanyDetails).length > 0) {
          response.companydetails = filteredCompanyDetails;
        }
      }
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error updating footer data", error: error.message });
    }
  };
  
  
  //DELETE

  const deleteFooter = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedFooter = await FooterModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedFooter) {
        return res.status(404).json({ message: "Footer not found" });
      }
  
      res.status(200).json({ deletedAt: updatedFooter.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting footer data", error });
    }
  };


  export { getFooter, createFooter, updateFooter, deleteFooter };