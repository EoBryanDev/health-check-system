import { env } from "../env";
import WebServerFactory from "./infrastructure/http/factory/WebServerFactory";
import { JobRunner } from "./infrastructure/jobs/JobRunner";

const app = new WebServerFactory('express')

app.startup(env.SERVER_PORT)

JobRunner.start();