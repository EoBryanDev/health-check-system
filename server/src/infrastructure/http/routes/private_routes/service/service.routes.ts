import { Router, Request, Response } from 'express';
import { DrizzlePostgreRepository } from '../../../../repository/DrizzlePostgreRepository';
import { BCryptHashPwd } from '../../../../../domain/services/BCryptHashPwd';
import { JwtTokenGenerator } from '../../../../../domain/services/JwtTokenGenerator';
import { RouteFactory } from '../../RouteFactory';
import { authMiddleware } from '../../../../middlewares/authHandler';

const db = new DrizzlePostgreRepository();
const hash = new BCryptHashPwd();
const token = new JwtTokenGenerator();

const factory = RouteFactory.getInstance(db, hash, token);

const service: Router = Router();

const serviceController = factory.getServiceControllerInstance();

service.post('/services', authMiddleware, (req: Request, res: Response) =>
  serviceController.createService(req, res)
);

service.get('/services', authMiddleware, (req: Request, res: Response) =>
  serviceController.findAllServices(req, res)
);

service.get('/services/:id', authMiddleware, (req: Request, res: Response) =>
  serviceController.findServiceById(req, res)
);

export { service };
