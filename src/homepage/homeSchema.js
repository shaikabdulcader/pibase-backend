import mongoose from "mongoose";
const { Schema } = mongoose;
  
  const homeSchema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: false },
      btntxt: { type: String, required: false },
      img: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const HomeModel = mongoose.model("home", homeSchema);