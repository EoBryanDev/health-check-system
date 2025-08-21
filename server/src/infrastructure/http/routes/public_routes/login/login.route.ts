import { Router, Request, Response } from "express";
import { DrizzlePostgreRepository } from "../../../../repository/DrizzlePostgreRepository";
import { BCryptHashPwd } from "../../../../../domain/services/BCryptHashPwd";
import { JwtTokenGenerator } from "../../../../../domain/services/JwtTokenGenerator";
import { RouteFactory } from "../../RouteFactory";
// cria instâncias reais
const db = new DrizzlePostgreRepository();
const hash = new BCryptHashPwd();
const token = new JwtTokenGenerator();

const factory = RouteFactory.getInstance(db, hash, token)

const login = Router()

const loginController = factory.getLoginControllerInstance();

login.get('/login', (req, res) => loginController.login(req, res))

export { login }