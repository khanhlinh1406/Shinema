const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.authenToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) res.sendStatus(401);
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                res.sendStatus(401);
                return
            }
            next();
        });
    }

}