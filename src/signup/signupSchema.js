import mongoose from "mongoose";
const { Schema } = mongoose;
  
  const signupSchema = new Schema(
    {
      title: { type: String, required: true },
      btntxt: { type: String, required: false },
      img: { type: String, required: false },
      deletedAt: { type: Date },
    },
    { timestamps: true }
  );
  
  export const SignupModel = mongoose.model("signup", signupSchema);