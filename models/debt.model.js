const mongoose = require('mongoose');

 const debtOwner = {
    debtor :'debtor',
    creditor :'creditor'    
}

const DebtSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    title: {type:String, required:true},
    amount: {type:String, required:true},
    dateIncurred: {type:Date, required:true},
    dateDue: {type:Date, required:true},
    debtOwner: {type:String, required:true, enum:Object.values(debtOwner)}
},
    {timestamps:true}
);

const DebtModel = mongoose.model('Debt', DebtSchema);

module.exports= {
    debtOwner,
    DebtModel
}

