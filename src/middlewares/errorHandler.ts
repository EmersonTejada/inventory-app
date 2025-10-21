import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  if (err.name === "NotFoundError" ) {
    res.status(400).json({ message: err.message });
  }

  if (err.name === "DuplicatedError") {
    res.status(400).json({message: err.message})
  }

  res.status(500).json({ message: "Error interno del servidor" });
};
