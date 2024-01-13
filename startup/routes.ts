import "express-async-errors";
import cors from "cors";
import { Express } from "express";
import testimony from "../Routes/testimony";
import prayer from "../Routes/prayer";
import category from "../Routes/category";
import signupRouter from '../Routes/signup';
import loginRouter from '../Routes/login';
import logoutRouter from '../Routes/logout';
import postRouter from '../Routes/post';
import errorHandler from "../middlewares/error";

export default function (app: Express) {
    app.use(
      cors({
        origin: process.env.CORS_ALLOWED_ORIGINS?.split(","),
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type",
        exposedHeaders: "x-auth-token",
        credentials: true,
      })
    ),
    app.use("/api/testimonies", testimony);
    app.use("/api/category", category);
    app.use("/api/prayer", prayer);
    app.use('/api/signup', signupRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/logout', logoutRouter);
    app.use('/api/post', postRouter);
    
    // Always leave this as the last handler
    app.use(errorHandler);
}
