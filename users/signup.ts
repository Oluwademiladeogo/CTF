import express, { Request, Response } from 'express';
import { signupUser } from './user.controller';
const router = express.Router();
router.get('/', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Page not found' });
});
router.post('/', async (req: Request, res: Response) => {
    const { status, message } = await signupUser(req.body);
    res.status(status).json({ message: message });
});
export default router;
