import mongoose from "mongoose";
const { Schema } = mongoose;

export const MainSchema = {
    title: String,
    title2: String,
    para: String,
    btntxt: String,
    img: String,
  };
  
  export const PosbytzSchema = {
    title: String,
    para: String,
  };
  
  export const CardSchema = {
    title: String,
    para: String,
    icon: String,
  };
  

  export const CoreCardSchema = {
    img: String,
    title: String,
  };
  
  export const CoreSchema = {
    title: String,
    para: String,
    cards: [CoreCardSchema],
    img: String,
  };
  
  export const SubContentSchema = {
    para: String,
  };
  
  export const WorklifeSchema = {
    img: String,
    title: String,
    para: String,
    subcontents: [SubContentSchema]
  };
  
  export const PositionCardSchema = {
    title: String,
    btntext: String,
  };
  
  export const PositionsSchema = {
    title: String,
    cards: [PositionCardSchema]
  };
  
  export const PrincipleSchema = {
    title: String,
    para: String,
    btntxt: String,
  };
  
  export const FunSchema = {
    title: String,
    para: String,
  };
  
  const careerSchema = new Schema(
    {
      title: { type: String, required: true },
      deletedAt: { type: Date },
      main: [MainSchema],
      posbytz: [PosbytzSchema],
      card: [CardSchema],
      core: [CoreSchema],
      worklife: [WorklifeSchema],
      positions: [PositionsSchema],
      principle: [PrincipleSchema],
      fun: [FunSchema],
    },
    { timestamps: true }
  );
  
  export const CareerModel = mongoose.model("career", careerSchema);