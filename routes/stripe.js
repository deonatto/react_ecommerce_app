const { Router } = require('express');
const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/payment', async (req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (err, order)=>{
        if(err){
            res.status(500).json(err);
            console.log(err)
        }else{
            res.status(200).json(order);
        }
    })
})

module.exports = router;