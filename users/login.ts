import express, { Request, Response } from 'express';
import { loginUser } from './user.controller';
const router = express.Router();
router.get('/', (_req: Request, res: Response) => {
    res.status(404).json({ message: 'Page not found' });
});
router.post('/', async (req: Request, res: Response) => {
    //check if cookies or destroy cookies
    if (!req.cookies.authToken) {
        const data: any = await loginUser(req.body);
        if (data.token) {
            res.cookie('authToken', data.token)
                .status(data.status)
                .json({ message: data.message });
        } else {
            res.status(data.status).json({ message: data.message });
        }
    }
});
export default router;
