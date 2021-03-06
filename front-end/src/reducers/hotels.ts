import { FetchCardsHotelAction } from "../actions/index";
import { ActionTypes } from "../actions/types";

export interface cardsHotel{
  name: String,
  summary: String,
  type: String,
  accommodates: Number,
  beds: Number,
  bedrooms: Number,
  bathrooms: String,
  amenities: [String],
  price: String,
  image: String,
  address: String,
  score: Number,
}

export const hotelsReducer = (state: cardsHotel[] = [], action: FetchCardsHotelAction) => {
  switch (action.type) {
    case ActionTypes.fetchCardsHotels:
      return action.payload;
    default:
      return state;
  }
};
