const mongoose = require('mongoose');
const { exitOnError } = require('winston');

module.exports = async() =>{
    const dbURI = process.env.dbURI;
    try {
        const dB = await mongoose.connect(dbURI, {
            useNewUrlParser:true,
            userCreateIndex: true
        });
        console.log('db connection established successfully...');
    } catch (e) {
        console.log("error"+ e.message);
        throw Error(e);
    }
}
