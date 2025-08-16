import { env } from "../env";
import WebServerFactory from "./infrastructure/http/factory/WebServerFactory";

const app = new WebServerFactory('express')

app.startup(env.SERVER_PORT)