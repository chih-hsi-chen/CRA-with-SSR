import { Router } from 'express';

const router = Router();

router.get('/user', function(req, res, next) {
    return res.json({
        user: {
            username: 'JackChen',
            bio: 'i am full.'
        }
    });
});

export default router;