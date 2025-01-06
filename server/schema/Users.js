const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    github:{
        type: String,
        unique:true,
        required: true,
    },
    pic:{
        type:String,
        required: true,
        default:"https://cse.google.com/cse?cx=4796b5020fbeaf2e6&q=anonymous-avatar-icon&oq=anonymous-avatar-icon&gs_l=partner-web.3...4147.8045.0.8408.0.0.0.0.0.0.0.0..0.0.csems%2Cnrl%3D10...0....1.34.partner-web..0.0.0."
    }
},{timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User