import mongoose from "mongoose";
const { Schema } = mongoose;

export const AccordionItemSchema = {
    title: String,
    content: String,
  };
  
  const faqSchema = new Schema(
    {
      title: { type: String, required: true },
      accordion: [AccordionItemSchema],
      deletedAt: { type: Date }
    },
    { timestamps: true }
  );
  
  export const FaqModel = mongoose.model("faq", faqSchema);