const zod = require("zod");
const UserDB = require("../db");
const prismaDB = require("../prismaDB");

const updationInfo = zod.object({
    username: zod.string().email().max(50).min(4),
    password: zod.string().min(6).max(20).optional(),
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional()
})

function updationMiddleware(req, res, next) {
    const ipInfo = req.body;
    console.log(ipInfo);
    const success = updationInfo.safeParse(ipInfo);
    if (!success) {
        res.json({
            msg: "Please send correct info (first name and last name less than 50 chars)"
        })
    }
    next();
}

module.exports = updationMiddleware;