import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet';
import promBundle from 'express-prom-bundle'

import { IWebServer } from '../interfaces/IWebServer';
import { home } from '../routes/public_routes/home';

class ExpressWebServer implements IWebServer {
    private server: Express;
    private starTime: Date;
    constructor() {
        this.server = express()
        this.starTime = new Date()
    }

    initialize = (port: number) => {
        this.createSecurity();
        this.createMetrics();
        this.createRoutes();
        this.createServer(port);
    };

    createServer = (port: number) => {
        this.server.listen(port, () => {
            console.log(`Server online on: http://localhost:${port}`);
        })
    };
    createRoutes = () => {
        this.server.use(home);
    };

    createSecurity = () => {
        this.server.use(helmet({
            crossOriginResourcePolicy: false,
        }))
        this.server.use(cors())
    };

    createMetrics = () => {
        const metricsMiddleware = promBundle({
            includeMethod: true,
            includePath: true,
            includeStatusCode: true,
            promClient: {
                collectDefaultMetrics: {},
            },
        });
        this.server.use(metricsMiddleware)
    }
}

export { ExpressWebServer };
