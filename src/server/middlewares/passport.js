const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');

function isValidPassword (user, password) {
    return bcrypt.compareSync(password, user.password);
}

passport.use('register', new LocalStrategy(
    {
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        try {
            if(!username || !password)
                return done(null, false, { reason: 'Missing Field(s)' });
            if(await req.db.collection('users').countDocuments({ username }) > 0)
                return done(null, false, { reason: 'The username has been used' });
            
            const hashedPasswd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const user = await req.db
                                .collection('users')
                                .insertOne({ username, password: hashedPasswd });
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

passport.use('login', new LocalStrategy(
    {
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        try {
            const user  = await req.db.collection('users').findOne({username});
        
            if (!user) return done(null, false, { reason: 'User not found' });
            if (!isValidPassword(user, password)) return done(null, false, { reason: 'Incorrect password' });

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

function cookieExtractor (req) {
    var token = null;
    if (req && req.cookies)
        token = req.cookies['jwt'];
    return token;
}

passport.use('jwt', new JWTStrategy(
    {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.SECRET
    },
    (jwtPayload, done) => {
        if(Date.now() > jwtPayload.expires)
            return done('jwt expired', false);

        return done(null, jwtPayload);
    }
));

export default passport;