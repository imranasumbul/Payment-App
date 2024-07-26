const express = require("express");
const prisma = require("../database calls/prismaDB");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const signupVerificationObject = require("../middlewares/signupAuth");
const signinVerificationObject = require("../middlewares/signinAuth");
const JWT_KEY = require("../config");

const headerAuth = require("../middlewares/headerAuth");
const updationMiddleware = require("../middlewares/updationAuth");


userRouter.post('/signup', signupVerificationObject.usernameAuth, signupVerificationObject.passwordAuth, signupVerificationObject.firstAndLastNameAuth, async function (req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const createdUser = await prisma.createUser(username, password, firstName, lastName);
        console.log(createdUser);
        const uniqueUserID = String(createdUser.id);

        const token = jwt.sign({ id: uniqueUserID }, JWT_KEY, { expiresIn: "365d" });

        return res.status(200).json({
            msg: `${token}`,
            id: `${uniqueUserID}`
        })

    } catch (e) {
        console.log("Error occured", e);
    }


})

userRouter.post("/signin", signinVerificationObject.usernameAndPasswordAuth, async function (req, res) {
    const username = req.body.username;
    const userObj = await prisma.userAlreadyExists(username);
    console.log("inside last")
    const userID = String(userObj.id);
    const token = jwt.sign({ id: userID }, JWT_KEY, { noTimestamp: true });
    return res.status(200).json({
        msg: `${token}`,
        id: `${userID}`
    })
})

userRouter.put("/", updationMiddleware, async function (req, res) {
    const { username, ...rest } = req.body;
    console.log(username);
    console.log(rest);
    const updatedUser = await prisma.updateUserInfo(username, rest);
    return res.status(200).json({
        msg: `updated user info`
    });
})

userRouter.get("/bulk",headerAuth, async function (req, res) {
    try{
        const searchersId = req.id;
        const { name } = req.query;
        console.log(name);
        if (!name) {
            return res.status(411).json({
                msg: "Please enter a name to search"
            })
        }
        const usersInfo = await prisma.findMultipleUsers(searchersId, name);
            
        const usersFirstAndLastNames = usersInfo.map((user) => {
            return {
                
                firstName: user.firstName,
                lastName: user.lastName
            };
        })
        if(usersFirstAndLastNames.length === 0){
            return res.status(411).json({
                msg: "no users found with your searched name"
            })
            
        }
        return res.status(200).json({  
            usersFirstAndLastNames
                
        })
    }catch(e){
        console.log("Error", e);
    }



    

})
userRouter.post('/header', headerAuth, function (req, res) {
    const id = req.id;
    console.log(id);
    return res.send("hii")
})
userRouter.use(function (err, req, res, next) {
    return res.json({
        msg: "Some error occured"
    })
})


module.exports = userRouter;