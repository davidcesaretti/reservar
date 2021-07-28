import mongoose, { Schema, model } from "mongoose";

interface available {
  _id: String;
  fechaSalida: String;
  fechaLlegada: String;
  info_user: String;
  state: String;
}
interface IUprop extends Document {
  host: string;
  name: string;
  city: String;
  available: [available];
}

const properties = new Schema<IUprop>(
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
    host: {
      type: String,
    },
    id_post: {
      type: Number,
    },
    coordinates: {
      type: Object,
    },
    reviews: {
      type: [Object],
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

export const Properties = model<IUprop>("Properties", properties);
