const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const messageModel = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content:{
        type: String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    },
},{
    timestamps:true,
})

const message = mongoose.model("Message", messageModel)
module.exports = message