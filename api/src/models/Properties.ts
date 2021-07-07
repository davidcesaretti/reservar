const {Schema, model} = require("mongoose")

const Properties = new Schema({
    name: {
        type: String,
},
    price: {
        type: Number,
        default: 0
    },
    adress: {
        type: String
    }
})

module.exports= model("Properties", Properties)