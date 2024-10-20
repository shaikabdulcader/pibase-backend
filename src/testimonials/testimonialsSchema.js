import mongoose from "mongoose";
const { Schema } = mongoose;

export const CardSchema = {
    title: String,
    content: String,
    img: String,
  };
  
  const testimonialsSchema = new Schema(
    {
      title: { type: String, required: true },
      card: [CardSchema],
      deletedAt: { type: Date }
    },
    { timestamps: true }
  );
  
  export const TestimonialsModel = mongoose.model("testimonial", testimonialsSchema);