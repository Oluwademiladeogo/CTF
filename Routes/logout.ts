import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).clearCookie('authToken').send('logout successful');
});

export default router;
