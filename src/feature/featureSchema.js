import mongoose from "mongoose";
const { Schema } = mongoose;

export const subcontentSchema = {
  title: String,
  img: String,
};

export const keyhighlightContentSchema = {
  topics: String,
};

export const keyhighlightSchema = {
  title: String,
  contents: [keyhighlightContentSchema], 
  img: String,
};

const featureSchema = new Schema(
  {
    title: { type: String, required: true },
    subcontent: [subcontentSchema], 
    keyhighlights: [keyhighlightSchema], 
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const FeatureModel = mongoose.model("Feature", featureSchema);
