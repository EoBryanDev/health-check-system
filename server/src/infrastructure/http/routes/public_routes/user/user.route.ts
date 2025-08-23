import { Router, Request, Response } from 'express';
import { DrizzlePostgreRepository } from '../../../../repository/DrizzlePostgreRepository';
import { BCryptHashPwd } from '../../../../../domain/services/BCryptHashPwd';
import { JwtTokenGenerator } from '../../../../../domain/services/JwtTokenGenerator';
import { RouteFactory } from '../../RouteFactory';

const db = new DrizzlePostgreRepository();
const hash = new BCryptHashPwd();
const token = new JwtTokenGenerator();

const factory = RouteFactory.getInstance(db, hash, token);

const user: Router = Router();

const userController = factory.getUserControllerInstance();

user.post('/users', (req: Request, res: Response) =>
  userController.createUser(req, res)
);

// user.get('/users/:id', (req, res) => userController.findUser(req, res))

// user.get('/users', (req, res) => userController.findAllUsers(req, res))

export { user };
