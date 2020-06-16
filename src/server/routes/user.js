import { Router } from 'express';
import passport from 'passport';
import Auth from '../middlewares/auth';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', function (req, res, next) {
    passport.authenticate('register', function (err, user, info) {
        if (err) {
            return res.status(400).json({ err });
        }
        if(!user) {
            return res.status(400).send({
                message: info.reason,
            });
        }

        return res.status(200).send({
            message: 'register success',
            user: {
                username: user.username
            },
        });

    })(req, res, next);
});

router.post('/login', function (req, res) {
    passport.authenticate('login', { session: false }, function (err, user, message) {
        if(err)
            return res.status(400).json({ err });
        if(!user)
            return res.status(400).json({ message });
        
        const payload = {
            username: user.username,
            expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
        }

        req.logIn(payload, { session: false }, function(err) {
            if (err)
                return res.status(400).json({ err });
            
            const token = jwt.sign(JSON.stringify(payload), process.env.SECRET);

            res.cookie('jwt', token, { httpOnly: true, secure: true });
            return res.status(200).send({ username: user.username });
        });

    })(req, res);
});

router.get('/auth', function (req, res) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if((!err || !info) && user) {
            return res.status(200).send({ isAuthenticated: true })
        }
        return res.status(401).send({ isAuthenticated: false });
    })(req, res);
});

export default router;