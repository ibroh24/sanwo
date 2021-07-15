const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const UserModel = require('../models/user.model.js');



const userRegisterSchema = joi.object({
    fullname: joi.string().min(3).max(36).required(),
    address: joi.string(),
    phone: joi.string().alphanum().min(11).max(20).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const userLoginSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().required(),
});


module.exports.register = (req, res, next) =>{
    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    let address = req.body.address;
    const { error, value } = userRegisterSchema.validate({
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

module.exports.login = async(req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    const { error, value } = await userLoginSchema.validate({
        email,
        password
    });
    if(error){
        console.log(error);
        return res.status(404).send({
            message : error.details[0].message
        });
    }

    try{
        // check if user exists
        const user = await UserModel.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            // then create a token
            const token = jwt.sign({
                userId: user._id, email},
                process.env.jwtSecret,
                {
                    expiresIn: "4h"
                }
            );

            res.status(200).send({
                user, token});
        }
        res.status(400).send("Invalid Credentials");
    }catch(er){
        res.status(500).send({
            message: er.message || "some error occurred"
        });
    }
}