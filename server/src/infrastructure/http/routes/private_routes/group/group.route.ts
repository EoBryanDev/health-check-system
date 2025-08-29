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

const group: Router = Router();

const groupController = factory.getGroupControllerInstance();

group.post('/groups', authMiddleware, (req: Request, res: Response) =>
  groupController.createGroup(req, res)
);

group.post('/groups/:group_id/users/:id', authMiddleware, (req: Request, res: Response) =>
  groupController.addUserToGroup(req, res)
);

group.delete('/groups/:group_id/users/:id', authMiddleware, (req: Request, res: Response) =>
  groupController.removeUserFromGroup(req, res)
);

group.put('/groups', authMiddleware, (req: Request, res: Response) =>
  groupController.editGroup(req, res)
);

group.delete('/groups/:id', authMiddleware, (req: Request, res: Response) =>
  groupController.deleteGroup(req, res)
);

// group.get('/groups/:id', (req: Request, res: Response) => groupController.findgroup(req, res))

group.get('/groups', authMiddleware, (req: Request, res: Response) =>
  groupController.findAllGroups(req, res)
);

export { group };
