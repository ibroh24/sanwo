const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const userRoute = require('../routes/user');

module.exports = (app) =>{
    // setup app config and middleware
    app.use(cors());
    app.use(morgan('combined'));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use((req, res, next) =>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, token, Token');

        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            return res.status(200).json({});
        }
        next();
    });

    // routes calls
    app.use('/api/user', userRoute);

    // error handlers
    app.use((req, res, next)=>{
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
    app.use((error, req, res, next)=>{
        res.status(error.status || 500);
        console.log('info', error);
        res.json({
            error:{message:error.message}
        });
    });
}

