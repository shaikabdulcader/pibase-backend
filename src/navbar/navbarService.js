import { NavbarModel } from "./navbarSchema.js";
import mongoose from "mongoose";

//GET

const getNavbar = async (req, res) => {
  try {
    const navbars = await NavbarModel.find();

    if (!navbars || navbars.length === 0) {
      return res.status(404).json({ message: "No navbar data available" });
    }

    const responseBodies = navbars.map(navbar => {
      const response = navbar.toObject();

      if (Array.isArray(response.content)) {
        response.content = response.content.map(e => {
          if (Array.isArray(e.subtitle) && e.subtitle.length === 0) {
            delete e.subtitle;
          }
          return e;
        }).filter(e => Object.keys(e).length > 0);
      }

      if (Array.isArray(response.content) && response.content.length === 0) {
        delete response.content;
      }

      return {
        _id: response._id,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        __v: response.__v,
        ...(response.title && { title: response.title }),
        ...(response.img && { img: response.img }),
        ...(response.content && response.content.length > 0 && { content: response.content }),
      };
    });

    res.status(200).json(responseBodies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving navbar data", error: error.message });
  }
  };

  //POST

  const createNavbar = async (req, res) => {
    try {
      const { title, img , content } = req.body;
      
      const newNavbar = new NavbarModel({
        title,
        img,
        content,
      });
  
      let savedNavbar = await newNavbar.save();
  
      savedNavbar = savedNavbar.toObject();
  
      if (Array.isArray(savedNavbar.content)) {
        savedNavbar.content = savedNavbar.content.map(e => {
          if (Array.isArray(e.subtitle) && e.subtitle.length === 0) {
            delete e.subtitle;
          }
          return e;
        }).filter(e => Object.keys(e).length > 0);
      }
  
      if (Array.isArray(savedNavbar.content) && savedNavbar.content.length === 0) {
        delete savedNavbar.content;
      }
  
      res.status(200).json(savedNavbar);
    } catch (error) {
      console.error('Error creating navbar:', error);
      res.status(500).json({ error: 'An error occurred while creating the navbar.' });
    }
  };

  //PUT

  const updateNavbar = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, img , content } = req.body;
  
      const updatedNavbar = await NavbarModel.findByIdAndUpdate(
        id,
        { title, img, content },
        { new: true, runValidators: true }
      );
  
      if (!updatedNavbar) {
        return res.status(404).json({ error: 'Navbar not found.' });
      }
  
      const updatedNavbarObj = updatedNavbar.toObject();
  
      if (Array.isArray(updatedNavbarObj.content)) {
        updatedNavbarObj.content = updatedNavbarObj.content.map(e => {
          if (Array.isArray(e.subtitle) && e.subtitle.length === 0) {
            delete e.subtitle;
          }
          return e;
        }).filter(e => Object.keys(e).length > 0);
      }
  
      if (Array.isArray(updatedNavbarObj.content) && updatedNavbarObj.content.length === 0) {
        delete updatedNavbarObj.content;
      }
  
      res.status(200).json(updatedNavbarObj);
    } catch (error) {
      console.error('Error updating navbar:', error);
      res.status(500).json({ error: 'An error occurred while updating the navbar.' });
    }
  };

  //DELETE

  const deleteNavbar = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedNavbar = await NavbarModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedNavbar) {
        return res.status(404).json({ message: "Navbar not found" });
      }
  
      res.status(200).json({ deletedAt: updatedNavbar.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Navbar data", error });
    }
  };

  export { getNavbar, createNavbar, updateNavbar, deleteNavbar };