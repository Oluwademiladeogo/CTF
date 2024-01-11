import express, { Request, Response } from 'express';
import { verifyUserOtp } from '../utils/otp';
const router = express.Router();
router.post('/', async (req: Request, res: Response) => {
    const { email, pass } = req.body;
    const { status, message } = await verifyUserOtp(email, pass);
    res.status(status).json({ message: message });
});
