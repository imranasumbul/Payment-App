
const express = require("express");
const prisma = require("../database calls/prismaDB");

const headerAuth = require("../middlewares/headerAuth");

const accountRouter = express.Router();
accountRouter.get("/hi", function (req, res) {
    return res.json({
        msg: "hi from accountRouter"
    })
})

accountRouter.get('/balance', headerAuth, async function (req, res) {
    const id = req.id;
    const userBalance = await prisma.getBalance(id);

    return res.json({
        msg: `User with id ${id} has a balance of ${userBalance}`
    })
})

accountRouter.post('/transfer', async function (req, res) {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = req.body.amount;
    const result = await prisma.transferMoney(senderId, receiverId, amount);
    if (result == -1) {
        return res.json({
            msg: `Invalid userID`
        })
    } else if (result == 0) {
        return res.json({
            msg: `Insufficient balance of sender`
        })
    }
    return res.json({
        msg: `Transaction successful!!!`
    })
})
module.exports = accountRouter;