import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  favorites: Array<String>;
  reserveId: Array<String>;
  phone_number: Number;
  reservas: Array<String>;
  propertiesreserved: Array<String>;
  status_account: String;
  isModerator: Boolean;
  // photo: string;
  // reserveId: [Object];
}

const user = new Schema<IUser>(
  {
    name: { type: String },
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
    favorites: { type: [] },
    reserveId: { type: [Object] },
    reservas: { type: [] },
    propertiesreserved: { type: [] },
    alternative_email: { type: String },
    posts: { type: [] },
    admin: Boolean,
    status_account: { type: String, enum: ["Active", "Suspended"] },
    isModerator: {type: Boolean}
  },
  { versionKey: false }
);
export const User = model<IUser>("User", user);

//agregar #huespedes, #cantidad(resolverlo desde fecha)//
const reserva = new Schema(
  {
    Prop_id: { type: String },
    fechaSalida: { type: Date },
    fechaLlegada: { type: Date },
    info_user: { type: String },
    state: { type: String },
    price: { type: Number },
    payment_id: { type: String },
    host: { type: String },
    propimg: { type: String },
    propname: { type: String },
  },
  { versionKey: false }
);
export const Reserva = model("Reserva", reserva);
/* ", enum: ["active", "expired", "pending"]" */
