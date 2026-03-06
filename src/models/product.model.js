const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true
    },
    price:{
        type: Number,
        required: true,
        index: true
    },
    category:{
        type: String,
        index: true
    },
    stock:{
        type: Number,
        default: 0
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive:{
        type: Boolean,
        default: true
    }
},
{
    timestamp: true
})

module.exports = mongoose.model("Product", productSchema);