const JWT_KEY = require("../config")
const jwt = require("jsonwebtoken")
function headerAuth(req, res, next){
    const headerAuthToken = req.headers.authorization;

    if(!(headerAuthToken.startsWith("Bearer "))){
        return res.json({
            msg: "Please send correct format for authorization header"
        })
    }

    const JWTtoken = headerAuthToken.split(" ")[1];
    const decoded = jwt.verify(JWTtoken, JWT_KEY);
    if(!decoded){
        return res.json({
            msg: `You sent the wrong token`
        })
    }
   
    console.log(decoded.id);
    req.id = decoded.id;
    next();

}
module.exports = headerAuth;