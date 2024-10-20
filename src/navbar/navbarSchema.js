import mongoose from "mongoose";
const { Schema } = mongoose;

export const subtitleSchema = {
  title: String,
  path: String,
}; 

export const contentSchema = {
  title: String,
  path: String,
  subtitle: [subtitleSchema],  
};

const navbarSchema = new Schema(
  {
    title: { type: String, required: true },
    img: {type: String},
    content: [contentSchema],
    deletedAt: { type: Date }, 
  },
  { timestamps: true } 
);

export const NavbarModel = mongoose.model("Navbar", navbarSchema);
