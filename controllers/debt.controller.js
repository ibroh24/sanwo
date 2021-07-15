const mongoose = require('mongoose');
const joi = require('@hapi/joi');
const {DebtModel, debtOwner} = require('../models/debt.model.js');


const validateDebtSchema = joi.object({
    title: joi.string(),
    amount: joi.number().min(2).required(),
    dateIncurred: joi.date().required(),
    dateDue: joi.date().required(),
    debtOwner: joi.string().required().valid(...Object.values(debtOwner)) 
});
const userId = "60f04696c1ff4d2270f5f75d"

module.exports.addDebt = (req, res) =>{
    const {title, amount, dateIncurred, dateDue, debtOwner} = req.body;

    const { error, value } = validateDebtSchema.validate({
        title,
        amount,
        dateIncurred,
        dateDue,
        debtOwner
    });
    if(error){
        return res.status(404).send({
            message : error.details[0].message
        });
    }

    try{
        // then save data
        const debt = new DebtModel({
            _id : new mongoose.Types.ObjectId(),
            userId,
            title,
            amount,
            dateIncurred,
            dateDue,
            debtOwner
        });
        debt.save().then(debt=>{
            res.send({debt, message: "Debt saved successfully!"});
        });
    }catch(er){
        res.status(400).send({
            message: er.message || "some error occurred"
        });
    }
}

module.exports.findUserDebt = (req, res) =>{
    const debtType = req.params.debtType;
    const debtVal = Object.values(debtOwner);
    // console.log(debtVal);
    /*
    debtVal.forEach(val=>{
        console.log(val);
        if(debtType !== val){
            res.status(400).send({message:"Invalid debt type"});
        }        
    });
    */

    if(!debtType){
        res.status(400).send({message:"Invalid debt type"});
    }
    
    DebtModel.find({userId: userId, debtOwner: debtType}).then(debt=>{
        if(!debt && debt != []){
            res.status(404).send({message: "debt cannot be found with user id " + userId})
        }
        res.send({debt, message: "User debt fetched successfully"})
    }).catch(err =>{
        res.status(400).send({message: "error occurred "+err.message});
    });
}

module.exports.update = (req, res)=>{
    const debtId = req.params.debtId;
    if(!debtId){
        res.status(400).send({message: "debt id cannot be null"});
    }
    const {title, amount, dateIncurred, dateDue, debtOwner} = req.body;

    const { error, value } = validateDebtSchema.validate({
        title,
        amount,
        dateIncurred,
        dateDue,
        debtOwner
    });
    if(error){
        return res.status(404).send({
            message : error.details[0].message
        });
    }
    DebtModel.findByIdAndUpdate(debtId, {
        title,
        amount,
        dateIncurred,
        dateDue,
        debtOwner
    }, {new:true}).then(debt=>{
        if(!debt){
            res.status(400).send({message: "debt not found"})
        }
        res.send({debt, message: "Debt updated successfully"});
    });
}