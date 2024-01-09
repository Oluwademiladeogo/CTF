import express from 'express';
import signupRouter from './users/signup';
import loginRouter from './users/login';

const app = express();
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

export default app;
