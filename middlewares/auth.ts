import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JwtPayload } from '../types';

config();

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const isAuthenticated = (req : CustomRequest, res: Response, next : NextFunction) => {
    const token = req.cookies["authToken"];

    if (!token)
    return res
      .status(401)
      .send({ success: false, details: "No auth token provided" });

      try {
          // try verifying the token sent by the user
          const secretKey  = process.env.JWTKEY || ""
          const decoded = jwt.verify(token, secretKey);
          req.user = decoded as JwtPayload;
          next();
        } catch (err) {
            return res
            .status(400)
            .send({ success: false, details: "Invalid or expired JsonWebToken" });
        }
    
}

export default isAuthenticated;