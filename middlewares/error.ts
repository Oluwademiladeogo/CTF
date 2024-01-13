import {Request, Response} from "express";

function errorHandler(err: Error, req: Request, res: Response, next: any) {
    res
      .status(500)
      .send({ details: "An error occured on the server", errorTrace: err.stack });
};

export default errorHandler;