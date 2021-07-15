import { database } from "faker/locale/cz";
import { dataAirbnb } from "./db";
require("./db");
const { Properties } = require("./src/models/Properties");
const { Cities } = require("./src/models/Cities");

export const createdTest = async () => {
  dataAirbnb
    .find({})
    .limit(1500)
    .then((data: any) =>
      data.map((x) => {
        new Properties({
          name: x._doc.name,
          summary: x._doc.summary,
          type: x._doc.property_type,
          accommodates: x._doc.accommodates,
          available: [],
          beds: x._doc.beds,
          bedrooms: x._doc.bedrooms,
          bathrooms: x._doc.bathrooms ? parseInt(x._doc.bathrooms) : 0,
          amenities: x._doc.amenities,
          price: parseInt(x._doc.price),
          image: x._doc.images.picture_url,
          score: x._doc.review_scores.review_scores_value
            ? x._doc.review_scores.review_scores_value
            : 0,
          address: `${x._doc.address.country}, ${x._doc.address.market} ${x._doc.address.government_area}`,
        }).save();
      })
    );
};

export const city = async () => {
  dataAirbnb.find({}).then((data: any) =>
    data.map((x) => {
      new Cities({
        name: x._doc.address.market,
      }).save();
    })
  );
};
//createdTest();
