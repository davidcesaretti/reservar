const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();
import { Schema, model } from "mongoose";

const { DB_HOST, DB_NAME, DB_PORT } = process.env;
const MONGODB_URL = `mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
//const MONGODB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    // ssl: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(chalk.blue(`Database is connected on ${MONGODB_URL}`))
  )
  .catch((err) => console.error(err));

const airbnb = new Schema({}, { collection: "properties" });
export const dataAirbnb = model("DatafaCostumer", airbnb);
