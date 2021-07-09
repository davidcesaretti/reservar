// import { dataAirbnb } from "./db";
// require("./db");
// const Property = require("./src/models/Properties");

// export const createdTest = async () => {
//   dataAirbnb
//     .find({})
//     .limit(100)
//     .then((data: any) =>
//       data.map((x) => {
//         new Property({
//           name: x._doc.name,
//           summary: x._doc.summary,
//           type: x._doc.property_type,
//           accommodates: x._doc.accommodates,
//           beds: x._doc.beds,
//           bedrooms: x._doc.bedrooms,
//           bathrooms: x._doc.bathrooms,
//           amenities: x._doc.amenities,
//           price: x._doc.price,
//           image: x._doc.images.picture_url,
//           score: x._doc.review_scores.review_scores_value
//             ? x._doc.review_scores.review_scores_value
//             : 0,
//           address: `${x._doc.address.country}, ${x._doc.address.market} ${x._doc.address.government_area}`,
//         }).save();
//       })
//     );
// };

// createdTest();
