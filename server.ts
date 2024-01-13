import express from 'express';
import { config } from "dotenv";
import routes from './startup/routes';
import startUpConfig from './startup/config';
import {connectDB} from './startup/db';

config();

const app = express();
const { PORT } = process.env;

// Leave in this order
startUpConfig();
connectDB();
app.use(express.json());
routes(app); // All route handlers

app.listen(PORT || 3000, () => {
    console.log(`Server is running on ${PORT}`);
});

export default app;
