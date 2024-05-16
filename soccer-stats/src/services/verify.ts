import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role: string;
}

declare global {
    namespace Express {
      interface Request {
        user?: TokenPayload;
      }
    }
  }

const JWT_SECRET: string = process.env.JWT_SECRET;

const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação não fornecido." });
  }

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado. Faça login novamente." });
    }
    return res.status(401).json({ error: "Token de autenticação inválido." });
  }
};

export { verificarToken };
