import mongoose from "mongoose";
const { Schema } = mongoose;
  
  const brandSchema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: false },
      btntext: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const BrandModel = mongoose.model("brand", brandSchema);