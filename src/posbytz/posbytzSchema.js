import mongoose from "mongoose";
const { Schema } = mongoose;

 export const erpCardSchema = {
  img: {
    type: String,
  },
  cardtitle: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  }
};

const posbytzSchema = new Schema(
  {
    title: { type: String, required: true },
    title2: String,
    title3: String,
    erpcard: [erpCardSchema],
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

export const PosbytzModel = mongoose.model("Posbytz", posbytzSchema);
