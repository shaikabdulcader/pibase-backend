import mongoose from "mongoose";
const { Schema } = mongoose;

export const cardSchema = {
  title: String,
  para: String,
  btntxt: String
};

export const kindSchema = {
  title: String,
  para:  String,
  card: [cardSchema]
};

export const helpSchema ={
  title:  String,
  para:  String,
  btntxt: String,
};

const supportSchema = new Schema({
  title: { type: String, required: true },
  deletedAt: { type: Date },
  help: [helpSchema], 
  kind: [kindSchema] 
}, { timestamps: true });

export const SupportModel = mongoose.model("support", supportSchema);
