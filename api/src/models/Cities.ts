import mongoose, { Schema, model } from "mongoose";

const city = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

export const Cities = model("cities", city);
