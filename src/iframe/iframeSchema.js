import mongoose from "mongoose";
const { Schema } = mongoose;
  
  const iframeSchema = new Schema(
    {
      title: { type: String, required: true },
      subheading: { type: String, required: false },
      content: { type: String, required: false },
      video: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const IframeModel = mongoose.model("iframe", iframeSchema);