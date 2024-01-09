import express from 'express';
import signupRouter from './users/signup';
import loginRouter from './users/login';
import logoutRouter from './users/logout';
const app = express();
app.use(express.json());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('logout', logoutRouter);

export default app;
