import passport from 'passport';

/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next 
 */
function Auth ( req, res, next ) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if((!err || !info) && user) {
            req.user = user;
            return next();
        }
        return res.status(401).redirect('/login');
    })(req, res, next);
}

export default Auth;