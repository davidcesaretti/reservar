import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  photo: string;
}

const user = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    reserveId: { type: [Object] },
  },
  { versionKey: false }
);

export const User = model<IUser>("User", user);

const userRegistered = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true, unique: true },
    nationality: { type: String, required: true },
    identity_document_type: {
      type: String,
      required: true,
      enum: [
        "Cédula de Identidad",
        "Documento nacional de Identidad",
        "Cédula de Ciudadanía",
        "Registro de Identidad Civil",
      ],
    },
    identity_document_number: { type: Number, required: true, unique: true },
    date_birth: { type: Date, required: true },
    residence_address: { type: String, required: true },
    city_and_country_of_residence: { type: String, required: true },
    emergency_contact: { type: String, required: true },
    emergency_phone_number: { type: Number, required: true },
    relationship: { type: String, enum: ["Family", "Friend"] },
    role: { type: String, enum: ["Traveler", "Host"] },
  },
  { versionKey: false }
);

export const UserRegistered = model("UserRegistered", userRegistered);

const reserva = new Schema(
  {
    fechaSalida: { type: Date },
    fechaLlegada: { type: Date },
    info_user: { type: Object },
  },
  { versionKey: false }
);
export const Reserva = model("Reserva", reserva);
