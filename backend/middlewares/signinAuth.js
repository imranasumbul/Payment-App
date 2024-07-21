const zod = require("zod");
//const UserDB = require("../db");
const prisma = require("../prismaDB")
const usernameverify = zod.object({ username: zod.string().email().max(50).min(4)});
const passwordVerify = zod.object({ password: zod.string().min(6).max(20)});

const usernameAndPasswordAuth = async function (req, res, next){
    
    const username = req.body.username;
    const password = req.body.password;
    const parsedUsername = usernameverify.safeParse({username});
    
    if(!parsedUsername.success){
        res.status(411).json({
            msg: "The username must be an email id with more than 4 and less than 50 characters"
        })
    }
    
    const usernameInDB = await prisma.userAlreadyExists(username);
    if(!usernameInDB){
        res.status(411).json({
            msg: "This email ID is not registered. Try Registering"
        })
    }else if(password !== usernameInDB.password){
        
            res.status(411).json({
                msg: "You entered wrong password"
            })
        }
        
    next();
    
}

module.exports = {usernameAndPasswordAuth};