// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { DrizzlePostgreRepository } from '../repository/DrizzlePostgreRepository';
import { BCryptHashPwd } from '../../domain/services/BCryptHashPwd';
import { JwtTokenGenerator } from '../../domain/services/JwtTokenGenerator';
import { RouteFactory } from '../http/routes/RouteFactory';
import { IDataInToken } from '../dto/IDataInToken';

const db = new DrizzlePostgreRepository();
const hash = new BCryptHashPwd();
const token = new JwtTokenGenerator();

const factory = RouteFactory.getInstance(db, hash, token);

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Espera no formato "Bearer <token>"
  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const payload = factory.getTokenService().validate(token);

  if (!payload) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }

  // 🔹 Se quiser anexar o usuário ao request
  req.user = payload as IDataInToken;

  next();
}
