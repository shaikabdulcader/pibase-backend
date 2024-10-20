import mongoose from "mongoose";
const { Schema } = mongoose;


  const automateSchema = new Schema(
    {
      title: { type: String, required: true },
      btntxt: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const AutomateModel = mongoose.model("automate", automateSchema);