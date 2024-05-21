import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
  sub: string;
}

export function estaAutenticado(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).end();

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
    req.user_id = +sub; // insere o ID do usuario dentro da Request
    return next();
  } catch (err) {
    return res.status(401);
  }
}
