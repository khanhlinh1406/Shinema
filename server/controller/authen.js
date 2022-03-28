const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.authenToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];

    //const token = req.cookies.access_token;

    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.sendStatus(403);
            return
        }
        next();
    });
}