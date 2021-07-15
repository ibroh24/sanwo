const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const userModel = require('../models/user.model');


const userValidationSchema = joi.object({
    fullname: joi.string().alphanum().min(3).max(36).required(),
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
    const { error, value } = userValidationSchema.validate({
        fullname,
        email,
        password,
        phone,
        address
    });
    console.log(error);
    console.log(value);
}