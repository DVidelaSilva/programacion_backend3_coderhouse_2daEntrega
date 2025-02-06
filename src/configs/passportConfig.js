import passport from "passport";
import jwt from 'passport-jwt';
import envConfig from './envConfig.js'



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {

    const cookieExtractor = req => {
        let token = null
        if (req && req.cookie) {
            token = req.cookie['token']
        }
        return token
    }


    // Estrategia JWT

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: envConfig.private_key_jwt
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))
}



export {
    initializePassport
} 