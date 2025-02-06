import passport, { strategies } from "passport";


const passportCall = (strategy) => {
    return async (req, resizeBy, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(!user) {
                return res.status(401).send({error: info.message ? info.message : info.toString()})
            }

            req.user = usernext()
        })(req, res, next)
    }
}

export default passportCall