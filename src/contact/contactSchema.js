import mongoose from "mongoose";
const { Schema } = mongoose;

export const FormSchema = {
    title: String,
    para: String,
  };
  
  const contactSchema = new Schema(
    {
      title: { type: String, required: true },
      form: [FormSchema],
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const ContactModel = mongoose.model("contact", contactSchema);