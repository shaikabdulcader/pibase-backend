import mongoose from "mongoose";
const { Schema } = mongoose;

export const contentSchema = {
  title: String,
};

export const imgSchema = {
  url: String,
};

export const cardSchema = {
  title: String,
  icon: String,
  description: String,
};

export const howToReachSchema = {
  title: String,
  description: String,
  card: [cardSchema],
};

const aboutSchema = new Schema(
  {
    title: { type: String, required: true },
    deletedAt: { type: Date },
    img: [imgSchema],
    contents: [contentSchema],
    howtoreach: [howToReachSchema],
  },
  { timestamps: true }
);

export const AboutModel = mongoose.model("about", aboutSchema);
