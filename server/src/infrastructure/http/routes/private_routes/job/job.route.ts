import { Router } from "express";
import { DrizzlePostgreRepository } from "../../../../repository/DrizzlePostgreRepository";
import { BCryptHashPwd } from "../../../../../domain/services/BCryptHashPwd";
import { JwtTokenGenerator } from "../../../../../domain/services/JwtTokenGenerator";
import { RouteFactory } from "../../RouteFactory";
import { authMiddleware } from "../../../../middlewares/authHandler";

const db = new DrizzlePostgreRepository();
const hash = new BCryptHashPwd();
const token = new JwtTokenGenerator();

const factory = RouteFactory.getInstance(db, hash, token)

const job = Router()

const jobController = factory.getJobControllerInstance();

job.post('/jobs', authMiddleware, (req, res) => jobController.createJob(req, res))

// job.get('/jobs/:id', (req, res) => jobController.findjob(req, res))

job.get('/jobs', authMiddleware, (req, res) => jobController.findAll(req, res))

job.post('/jobs/service', authMiddleware, (req, res) => jobController.addServiceToJob(req, res))

job.put('/jobs/run/:id', authMiddleware, (req, res) => jobController.runJob(req, res))


export { job }