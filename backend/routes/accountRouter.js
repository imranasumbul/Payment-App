const { Prisma } = require("@prisma/client");
const express = require("express");
const prisma = require("../prismaDB");



const accountRouter = express.Router();
accountRouter.get("/hi", function (req, res){
    res.json({
        msg: "hi from accountRouter"
    })
})

accountRouter.get('/balance', async function (req, res){
    const id = req.body.userId;
    const userBalance = await prisma.getBalance(id);
    
    res.json({
        msg :`User with id ${id} has a balance of ${userBalance}`
    })
})

accountRouter.post('/transfer', async function (req, res){
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = req.body.amount;
    const result = await prisma.transferMoney(senderId, receiverId, amount);
    if(result == -1){
        res.json({
            msg: `Invalid userID`
        })
    }else if(result == 0){
        res.json({
            msg: `Insufficient balance of sender`
        })
    }
    res.json({
        msg: `Transaction successful!!!`
    })
})
module.exports = accountRouter;