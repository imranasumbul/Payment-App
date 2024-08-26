const zod = require("zod");
//const UserDB = require("../db");
const prismaDB = require("../database calls/prismaDB");
const usernameverify = zod.object({ username: zod.string().email().max(50).min(4) });
const passwordVerify = zod.object({ password: zod.string().min(6).max(20) });
const firstAndlastNameVerify = zod.object({
    firstName: zod.string().max(50),
    lastName: zod.string().max(50)
})

async function usernameAuth(req, res, next) {
    try {
        const username = req.body.username;
        const parsedUsername = usernameverify.safeParse({ username });
        console.log(parsedUsername.success)
        if (!parsedUsername.success) {
            return res.status(411).json({
                msg: "The username must be an email id with more than 4 and less than 50 characters"
            })
        }
        const usernameAlreadyExists = await prismaDB.userAlreadyExists(username);
        //await prismaDB.deleteUsersWithId(31, 32, 33 , 34, 35, 36, 37, 38, 39, 40);
        if (usernameAlreadyExists) {
            return res.status(411).json({
                msg: "Email already taken. Try signing in to your account"
            })

        } else {
            next();
        }

    } catch (e) {
        console.log("some error occured", e);
    }

}
function passwordAuth(req, res, next) {
    try {
        const password = req.body.password;
        const parsedPassword = passwordVerify.safeParse({ password });
        if (!parsedPassword.success) {
            return res.status(411).json({
                msg: "The password must have more than 5 and less than 20 characters"
            })
        } else {
            next();
        }

    } catch (e) {
        console.log("some error occured", e);
    }


}
function firstAndLastNameAuth(req, res, next) {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const nameObject = { firstName, lastName };
        const parsedNameObj = firstAndlastNameVerify.safeParse(nameObject);
        if (!parsedNameObj.success) {
            return res.status(411).json({
                msg: "Both First name and Last name should be less than 50 characters long"
            })
        } else {
            next();
        }

    } catch (e) {
        console.log("some error occured", e);
    }

}

module.exports = {
    usernameAuth,
    passwordAuth,
    firstAndLastNameAuth
}