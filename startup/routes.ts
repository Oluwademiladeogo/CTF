import cors from "cors";
import { Express } from "express";
import testimony from "../Routes/testimony";
import prayer from "../Routes/prayer";
import category from "../Routes/category";
import signupRouter from '../Routes/signup';
import loginRouter from '../Routes/login';
import logoutRouter from '../Routes/logout';
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
    app.use("/testimonies", testimony);
    app.use("/category", category);
    app.use("/prayer", prayer);
    app.use('/signup', signupRouter);
    app.use('/login', loginRouter);
    app.use('logout', logoutRouter);
    
    // Always leave this as the last handler
    app.use(errorHandler);
}
