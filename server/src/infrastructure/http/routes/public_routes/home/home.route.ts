import { Router, Request, Response } from "express";

const home = Router()

home.get('/health-check', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' })
})

export { home }