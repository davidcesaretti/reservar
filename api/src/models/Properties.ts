import mongoose, { Schema, model } from "mongoose";

const properties = new Schema(
  {
    name: {
      type: String,
    },
    summary: {
      type: String,
    },
    type: {
      type: String,
    },
    accommodates: {
      type: Number,
    },
    beds: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },

    amenities: {
      type: [String],
    },
    available: {
      type: [Object],
    },
    price: {
      type: Number,
    },

    image: {
      type: String,
    },

    address: {
      type: String,
    },
    city: {
      type: String,
    },
    score: {
      type: Number,
    },
    id_post: {
      type: Number,
    },
  },
  { versionKey: false }
);

// ****TYPES OF PROPERTIES****

// House
// Apartment
// Condominium
// Loft
// Guesthouse
// Hostel
// Serviced Apartment
// Bed and breakfast
// Treehouse
// Bungalow
// Guest suite

export const Properties = model("Properties", properties);
