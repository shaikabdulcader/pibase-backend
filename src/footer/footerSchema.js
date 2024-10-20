import mongoose from "mongoose";
const { Schema } = mongoose;

export const ContentSchema = {
  txt: String
};

export const SectionSchema = {
  title: String,
  contents: [ContentSchema]
};

const footerSchema = new Schema(
  {
    title: { type: String, required: true },
    deletedAt: { type: Date },
    logo: { type: String, default: '' },
    para1: { type: String, default: '' },
    para2: { type: String, default: '' },
    companydetails: {
      product: { type: [SectionSchema], default: [] },
      company: { type: [SectionSchema], default: [] },
      support: { type: [SectionSchema], default: [] },
      partners: { type: [SectionSchema], default: [] },
      account: { type: [SectionSchema], default: [] }
    },
    findus: { type: String, default: '' }
  },
  { timestamps: true }
);

export const FooterModel = mongoose.model("Footer", footerSchema);
