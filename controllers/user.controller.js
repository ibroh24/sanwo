const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const UserModel = require('../models/user.model.js');


const userValidationSchema = joi.object({
    fullname: joi.string().min(3).max(36).required(),
    address: joi.string(),
    phone: joi.string().alphanum().min(11).max(20).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});


module.exports.register = async(req, res, next) =>{
    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let address = req.body.address;
    const { error, value } = await userValidationSchema.validate({
        fullname,
        email,
        password,
        phone,
        address
    });
    if(error){
        // console.log(error.details[0].message)
        return res.status(404).send({
            message : error.details[0].message
        });
    }

    const user = new UserModel({
        fullname, email, phone, address, 
        _id: new mongoose.Types.ObjectId(),
        password: bcrypt.hashSync(password)
    });
    user.save().then(val =>{
        res.send({
            val,
            message: "Registered successfully!"
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "some error occurred"
            });
        });
    });
}