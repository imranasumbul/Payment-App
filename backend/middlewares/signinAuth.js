const zod = require("zod");

const prisma = require("../database calls/prismaDB")


const usernameverify = zod.object({ username: zod.string().email().max(50).min(4) });
const passwordVerify = zod.object({ password: zod.string().min(6).max(20) });

const usernameAndPasswordAuth = async function (req, res, next) {

    const username = req.body.username;
    const password = req.body.password;
    const parsedUsername = usernameverify.safeParse({ username });

    if (!parsedUsername.success) {
        return res.status(411).json({
            msg: "The username must be a valid email id with more than 4 characters"
        })
    }

    const usernameInDB = await prisma.userAlreadyExists(username);
    if (!usernameInDB) {
        return res.status(411).json({
            msg: "This email ID is not registered. Try Registering"
        })
    } else if (password !== usernameInDB.password) {

        return res.status(411).json({
            msg: "You entered wrong password"
        })
    }

    next();

}

module.exports = { usernameAndPasswordAuth };