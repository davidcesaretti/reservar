const {Schema, model} = require("mongoose")

const Products = new Schema({
    name: {
        type: String,
},
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    }
})

module.exports= model("products", Products)