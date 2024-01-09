import express, { Request, Response } from 'express';
import { User } from '../models/users';
import { signupUser } from './user.controller';
const router = express.Router();
router.get('/', (_req: Request, res: Response) => {
    res.status(404).send('Page not found');
});
router.post('/', async (req: Request, res: Response) => {
    const data = await signupUser(req.body)
    res.status(data.status).json({message: data.message})
});
export default router;
