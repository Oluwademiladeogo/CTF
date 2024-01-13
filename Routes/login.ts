import { Request, Response, Router } from 'express';
import { loginUser } from '../controllers/login';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    //check if cookies or destroy cookies
    if (!req.cookies?.authToken) {
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
