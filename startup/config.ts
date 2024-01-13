import { config } from "dotenv";

config();

export default function () {
    const { JWTKEY } = process.env;
    const { MONGODB_URI } = process.env;

    if (!JWTKEY) {
        throw new Error("FATAL ERROR: JWTKEY is not defined");
    }
    
    if (!MONGODB_URI) {
    throw new Error("FATAL ERROR: MONGO DB CONNECTION STRING is not defined");
    }
}