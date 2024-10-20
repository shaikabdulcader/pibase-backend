import { IframeModel } from "./iframeSchema.js";
import mongoose from "mongoose";


//GET

const getIframe = async (req, res) => {
  try {
    const iframes = await IframeModel.find({
      deletedAt: { $exists: false },
    });

    if (!iframes || iframes.length === 0) {
      return res.status(404).json({ message: "No iframe data available" });
    }

    res.status(200).json(iframes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving iframe data", error: error.message });
  }
  };

  //POST

  const createIframe = async (req, res) => {
    try {
      const newIframeData = await IframeModel.create({
        title: req.body.title,
        subheading: req.body.subheading || '',
        content: req.body.content || '',
        video: req.body.video || '',
      });
  
      const response = newIframeData.toObject();

      if (!response.subheading) {
        delete response.subheading;
      }
      if (!response.content) {
        delete response.content;
      }
      if (!response.video) {
        delete response.video;
      }
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error creating Iframe data", error: error.message });
    }
  };

  //PUT

  const updateIframe = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {};
        
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.deletedAt) updateData.deletedAt = req.body.deletedAt;
        
        if (req.body.subheading && req.body.subheading.length > 0) {
          updateData.subheading = req.body.subheading;
        }
        if (req.body.content && req.body.content.length > 0) {
          updateData.content = req.body.content;
        }
        if (req.body.video && req.body.video.length > 0) {
          updateData.video = req.body.video;
        }

        const updatedIframe = await IframeModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
    
        if (!updatedIframe) {
          return res.status(404).json({ message: "Iframe not found" });
        }
    
        const response = updatedIframe.toObject();
    
        const responseBody = {
          _id: response._id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
          __v: response.__v,
          ...(response.title && { title: response.title }),
          ...(response.subheading && response.subheading.length > 0 && { subheading: response.subheading }),
          ...(response.content && response.content.length > 0 && { content: response.content }),
          ...(response.video && response.video.length > 0 && { video: response.video }),
        };
    
        res.status(200).json(responseBody);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating Iframe data", error: error.message });
      }
  };

  //DELETE


  const deleteIframe = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
      const updatedIframe = await IframeModel.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
      );
  
      if (!updatedIframe) {
        return res.status(404).json({ message: "Iframe not found" });
      }
  
      res.status(200).json({ deletedAt: updatedIframe.deletedAt });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting Iframe data", error });
    }
  };


  export { getIframe, createIframe, updateIframe, deleteIframe };