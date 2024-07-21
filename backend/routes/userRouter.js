const express = require("express");
const prisma = require("../prismaDB");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const signupVerificationObject = require("../middlewares/signupAuth");
const signinVerificationObject = require("../middlewares/signinAuth");
const JWT_KEY = require("../config");
//const UserDB = require("../../../Payment-App/backend/db");
const headerAuth = require("../middlewares/headerAuth");
const updationMiddleware = require("../middlewares/updationAuth");
userRouter.get("/", function (req, res) {
    res.json({
        msg: "from api/v1/users"
    })
})


userRouter.post('/signup', signupVerificationObject.usernameAuth, signupVerificationObject.passwordAuth, signupVerificationObject.firstAndLastNameAuth, async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userAlreadyExists = await prisma.userAlreadyExists(username);
    if(userAlreadyExists){
        res.status(400).json({
            msg: `user with email ${username} already exists. try signing in to your account`
        })
    }
    const createdUser = await prisma.createUser(username, password, firstName, lastName);
    console.log(createdUser);
    const uniqueUserID = String(createdUser.id);

    const token = jwt.sign({ id: uniqueUserID }, JWT_KEY, { expiresIn: "365d" });

    res.status(200).json({
        msg: `${token}`,
        id: `${uniqueUserID}`
    })

    //res.send("user created")
})

userRouter.post("/signin", signinVerificationObject.usernameAndPasswordAuth, async function (req, res) {
    const username = req.body.username;
    const userObj = await prisma.userAlreadyExists(username);
    console.log("inside last")
    const userID = String(userObj.id);
    const token = jwt.sign({ id: userID }, JWT_KEY, { noTimestamp: true });
    res.status(200).json({
        msg: `${token}`,
        id: `${userID}`
    })
})

userRouter.put("/", updationMiddleware, async function (req, res) {
    const { username, ...rest } = req.body;
    console.log(username);
    console.log(rest);
    const updatedUser = await prisma.updateUserInfo(username, rest);
    res.status(200).json({
        msg: `updated user info`
    });
})

userRouter.get("/bulk", async function (req, res) {
    const { name } = req.query;
    console.log(name);
    if (!name) {
        res.json({
            msg: "Please enter a name to search"
        })
    }
    const users = await prisma.findMultipleUsers(name);
    if (!users) {
        res.json({
            msg: "no users found with your searched name"
        })
    } else {
        console.log(users)
        const usersMatchedNames = users.map((user) => {
            let info = `${user.firstName} ${user.lastName}`;
            return info;
        })
        console.log(usersMatchedNames);
        res.json({
            usersMatchedNames
        })

    }


})
userRouter.post('/header', headerAuth, function (req, res){
    const id = req.id;
    console.log(id);
    res.send("hii")
})
userRouter.use(function (err, req, res, next) {
    res.json({
        msg: "Some error occured"
    })
})


module.exports = userRouter;