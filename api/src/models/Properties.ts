const { Schema, model } = require("mongoose");

const Properties = new Schema({
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
    type: String,
  },

  amenities: {
    type: [String],
  },

  price: {
    type: String,
  },

  image: {
    type: String,
  },

  adress: {
    type: String,
  },
});

module.exports = model("Properties", Properties);
