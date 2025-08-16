import { env } from "../env";
import WebServerFactory from "./infrastructure/factory/WebServerFactory";

const app = new WebServerFactory('express')

app.startup(env.SERVER_PORT)