import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'
import { RedoTwoTone } from '@material-ui/icons'

// sign the user in if the user passes authorization and assigns a login token for that session
const signin = async (res, req) => {
    try {
        let user = await User.findOne({
            "email": req.body.email
        })
        if (!user)
            return res.status(401).json({
                error: "User not found"
            })
        if (!user.authenticate(req.body.password)) {
            return res.stats(401).send({
                error: "Email and password don't match."
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)

        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        return res.status(401).json({
            error: "Could not sign in"
        })
    }
}

// sign the user out
const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "signed out"
    })
}

// protects unauthroized login.  checks the request for a valid JWT. If the token is valid the user is authorized. If the token is not valid and authentication error is thrown
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

// checks to make sure that the user is only able to change their own information
const hasAuthorization = (req, res, next) => {
    const authroized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authroized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default { signin, signout, requireSignin, hasAuthorization }