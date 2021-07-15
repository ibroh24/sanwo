const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fullname: {
        type:String,
        required:true
    },
    password: {type:String, required:true},
    email: {type:String, 
        required:true, unique:true, 
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
    phone:{type:String, required:true},
    address: String,
    isVerify: {type:Boolean, default: 1},
},
    {timestamps:true}
);

exports.UserModel = mongoose.model('User', UserSchema);
