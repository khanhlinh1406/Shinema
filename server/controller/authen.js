const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const AccountModel = require('../models/account')
const JWTModel = require('../models/JWTRefToken')

exports.authenToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        res.sendStatus(401)
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            console.log(err, data)
            if (err) {
                res.sendStatus(403)
            } else {
                next();
            }

        })
    }
}

exports.refresh = function(req, res) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        res.sendStatus(401);
    } else {

        JWTModel.find({
                refreshToken: refreshToken
            })
            .then(data => {
                console.log(data)
                if (data.length != 0) {
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
                        if (err) {
                            res.sendStatus(401);
                            return;
                        }

                        const accessToken = jwt.sign({ username: data.username },
                            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' }
                        );
                        res.json({ accessToken });
                    })
                } else {
                    res.json("Refresh token not exist");
                }
            })
            .catch(err => console.log(err))
    }

}

exports.login = function(req, res) {
    const email = req.body.email
    const password = req.body.password

    AccountModel.findOne({
            email: email
        })
        .then(data => {
            if (data) {
                if (data.password == password) {

                    const payload = {
                        email: email
                    }

                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

                    res.cookie('access_token', accessToken, {
                        maxAge: 60 * 1000,
                        httpOnly: true,
                        //secure: true;
                    })

                    res.cookie('refresh_token', refreshToken, {
                        maxAge: 365 * 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        //secure: true;
                    })

                    const _JWTRefTokens = new JWTModel({
                        refreshToken: refreshToken
                    })

                    JWTModel.create(_JWTRefTokens)
                        .then(data => {
                            res.status(200).json({ ok: true });
                        })
                        .catch(err => {
                            res.status(500).json({ Err_token: err })
                        })

                } else {
                    res.status(400).json("Password incorrect")
                }
            } else {
                res.status(400).json("Email not exist")
            }

        })
        .catch(err => {
            res.status(500).json({ Err_email: err })
        })

}


//--------------------------Token--------------------------//
exports.getAllToken = function(req, res) {
    JWTModel.find({})
        .then(data => {
            res.send(data[0])
        })
        .catch(err => console.log(err))
}

exports.addToken = function(req, res) {

    const newRefreshToken = req.body;
    JWTModel.create(newRefreshToken)
        .then(data => {
            res.send("Add success")
        })
        .then(data => {
            res.json("Successful")
        })
        .catch(err => {
            res.status(500).json({ Err: err })
        })

}

exports.deleteToken = function(req, res) {

}