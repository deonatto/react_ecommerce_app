const jwt = require('jsonwebtoken');

// check if token is valid
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid!");
            }else{
                req.user = user;
                next();
            }
        })
    }else{
        return res.status(401).json("You are not authenticated!");
    }
};

//check if users id are the same or if user have admin rights
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("Operation not allowed!");
        }
    })
}

// check if user have admin rights
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("Operation not allowed!");
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};