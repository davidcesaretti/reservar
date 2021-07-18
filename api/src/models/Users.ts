import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  // photo: string;
  // reserveId: [Object];

}

const user = new Schema<IUser>(
  {
    name: { type: String  },
    email: { type: String },
    phone_number: { type: Number },
    nationality: { type: String },
    identity_document_type: {
      type: String,
      enum: [
        "Cédula de Identidad",
        "Documento nacional de Identidad",
        "Cédula de Ciudadanía",
        "Registro de Identidad Civil",
      ],
    },
    identity_document_number: { type: Number },
    date_birth: { type: Date },
    residence_address: { type: String },
    city_and_country_of_residence: { type: String },
    emergency_contact: { type: String },
    emergency_phone_number: { type: Number },
    relationship: { type: String, enum: ["Family", "Friend"] },
    role: { type: String, enum: ["Traveler", "Host"] },
    favorites: { type: Array },
    reserveId: { type: [Object] },
  },
  { versionKey: false }
);
export const User = model<IUser>("User", user);


const reserva = new Schema(
  {
    fechaSalida: { type: Date },
    fechaLlegada: { type: Date },
    info_user: { type: Object },
  },
  { versionKey: false }
);
export const Reserva = model("Reserva", reserva);