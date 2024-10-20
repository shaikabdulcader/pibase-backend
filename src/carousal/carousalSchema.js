import mongoose from "mongoose";
const { Schema } = mongoose;


const carousalSchema = new Schema(
  {
    title: { type: String, required: true },
    deletedAt: { type: Date },
    cardata: [
      [
        {
          img: { type: String, required: true }
        }
      ]
    ]
  },
  { timestamps: true }
);

export const CarousalModel = mongoose.model("carousal", carousalSchema);
