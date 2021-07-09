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

  address: {
    type: String,
  },
  score: {
    type: Number,
  },
});

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

module.exports = model("Properties", Properties);
