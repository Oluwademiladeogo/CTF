import express, { Request, Response } from 'express';
import { signupUser } from '../controllers/signup';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { status, message } = await signupUser(req.body);
    res.status(status).json({ message: message });
});

export default router;
