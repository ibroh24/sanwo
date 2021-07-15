const jwt = require('jsonwebtoken');

exports.authCheck = async (req, res, next) => {
    let token = req.headers['authorization'];
    if(!token){
        return res.status(401).send({message: "Authorization Denied"})
    }
    try{
        token = token.split('"')[1].split(" ")[1];
        const decode = jwt.verify(token, process.env.jwtSecret);
        console.log(decode) 
        let authData = {
            email:decode.email,userID:decode.userID
        }
        // set authdata as global variable
        res.locals.authData = authData;
        req.authData =authData
        next();
    }catch(er){
        return res.status(401).send({message: "Authorization Denied"})
    }
    
}