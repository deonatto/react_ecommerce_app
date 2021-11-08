const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SC).toString(),
    });

    try{
        const response = await newUser.save();
        res.status(201).json(response);

    }catch(err){
        res.status(500).json(err);
    }
    
});


router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json("Wrong credentials");
        }else{
            const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SC);
            const pass = hashedPass.toString(CryptoJS.enc.Utf8);
            if(pass !== req.body.password){
                res.status(401).json("Wrong credentials");
            }else{
                const token = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                    }, process.env.JWT_SEC, {expiresIn:"3d"});

                //destructure user in password and others() to send all information but password to front
                //we use user._doc because is where mongoDB store the document with information
                const {password, ...others} = user._doc;
                res.status(200).json({...others, token});
            }
        }
        

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;