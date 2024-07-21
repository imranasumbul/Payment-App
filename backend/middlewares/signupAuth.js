const zod = require("zod");
//const UserDB = require("../db");
const prismaDB = require("../prismaDB");
const usernameverify = zod.object({ username: zod.string().email().max(50).min(4)});
const passwordVerify = zod.object({ password: zod.string().min(6).max(20)});
const firstAndlastNameVerify = zod.object({
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
})

async function usernameAuth(req, res, next){
    const username = req.body.username;
    const parsedUsername = usernameverify.safeParse({username});
    console.log(parsedUsername.success)
    if(!parsedUsername.success){
        res.status(411).json({
            msg: "The username must be an email id with more than 4 and less than 50 characters"
        })
    }
    const usernameAlreadyExists = await prismaDB.userAlreadyExists(username);
    
    if(usernameAlreadyExists){
        res.status(411).json({
            msg: "Email already taken. Try signing in to your account"
        })
        //code for checking if username already exists
    }
    next();
}
function passwordAuth(req, res, next){
    const password = req.body.password;
    const parsedPassword = passwordVerify.safeParse({password});
    if(!parsedPassword.success){
        res.status(411).json({
            msg: "The password must have more than 5 and less than 20 characters"
        })
    }
    next();
}
function firstAndLastNameAuth(req, res, next){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const nameObject = {firstName, lastName};
    const parsedNameObj = firstAndlastNameVerify.safeParse(nameObject);
    if(!parsedNameObj.success){
        res.status(411).json({
            msg: "Both First name and Last name should be less than 50 characters long"
        })
    }
    next();
}

module.exports = {
    usernameAuth,
    passwordAuth,
    firstAndLastNameAuth
}