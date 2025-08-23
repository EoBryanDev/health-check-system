import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import promBundle from 'express-prom-bundle';

import { IWebServer } from '../interfaces/IWebServer';
import { public_routes } from '../routes/public_routes';
import { private_routes } from '../routes/private_routes';

class ExpressWebServer implements IWebServer {
  private server: Express;
  private starTime: Date;
  constructor() {
    this.server = express();
    this.starTime = new Date();
  }

  initialize = (port: number) => {
    this.createSecurity();
    this.createMetrics();
    this.createRoutes();
    this.createServer(port);
  };

  createServer = (port: number) => {
    this.server.listen(port, () => {
      console.log(`Server online on: http://localhost:${port} - ${this.starTime}`);
    });
  };
  createRoutes = () => {
    this.server.use(express.json());
    public_routes.forEach((public_route) => {
      this.server.use(public_route);
    });

    private_routes.forEach((private_route) => {
      this.server.use(private_route);
    });
  };

  createSecurity = () => {
    this.server.use(
      helmet({
        crossOriginResourcePolicy: false,
      })
    );
    this.server.use(cors());
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
    this.server.use(metricsMiddleware);
  };
}

export { ExpressWebServer };
