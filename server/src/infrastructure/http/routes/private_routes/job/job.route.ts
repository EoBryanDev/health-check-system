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

const job: Router = Router();

const jobController = factory.getJobControllerInstance();

job.post('/jobs', authMiddleware, (req: Request, res: Response) =>
  jobController.createJob(req, res)
);

job.put('/jobs', authMiddleware, (req: Request, res: Response) =>
  jobController.editJob(req, res)
);

// job.get('/jobs/:id', (req: Request, res: Response) => jobController.findjob(req, res))

job.delete('/jobs/:id', authMiddleware, (req: Request, res: Response) =>
  jobController.deleteGroup(req, res)
);

job.get('/jobs', authMiddleware, (req: Request, res: Response) =>
  jobController.findAll(req, res)
);

job.post('/jobs/:job_id/services/:service_id', authMiddleware, (req: Request, res: Response) =>
  jobController.addServiceToJob(req, res)
);

job.put('/jobs/run/:id', authMiddleware, (req: Request, res: Response) =>
  jobController.runJob(req, res)
);

export { job };
