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

const service = Router()

const serviceController = factory.getServiceControllerInstance();

service.post('/services', authMiddleware, (req, res) => serviceController.createService(req, res))

service.get('/services', authMiddleware, (req, res) => serviceController.findAllServices(req, res))

service.get('/services/:id', authMiddleware, (req, res) => serviceController.findServiceById(req, res))



export { service }