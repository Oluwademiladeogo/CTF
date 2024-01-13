import express, { Request, Response } from 'express';
import { sendOtp } from '../utils/otp';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email } = req.body;
    const { status, message } = await sendOtp(email);
    res.status(status).json({ message: message });
});

export default router;
