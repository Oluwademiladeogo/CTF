import express, { Request, Response } from 'express';
import { verifyUserOtp } from '../utils/otp';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email, userProvidedOTP } = req.body;
    const { status, message } = await verifyUserOtp(email, userProvidedOTP);
    res.status(status).json({ message: message });
});

export default router;