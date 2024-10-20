import mongoose from "mongoose";
const { Schema } = mongoose;
  
  const integrationSchema = new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const IntegrationModel = mongoose.model("integration", integrationSchema);