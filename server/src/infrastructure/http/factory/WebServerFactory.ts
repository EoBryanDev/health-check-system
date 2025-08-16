import { IWebServer } from "../interfaces/IWebServer";
import { IWebServerFactory } from "../interfaces/IWebServerFactory";
import { ExpressWebServer } from "./ExpressWebServer";

class WebServerFactory implements IWebServerFactory {

    private server: IWebServer;

    constructor(webServerType: string) {
        let server;

        switch (webServerType) {
            case 'express':
                server = new ExpressWebServer()
                break;

            // case 'fastify':
            //     // implements your server
            //     break;

            // case 'hapi':
            //     // implements your server
            //     break;
            default:
                throw new Error("There's not any webserver passed");
        }

        this.server = server
    }

    public startup(port: number) {
        this.server.initialize(port)
    }

}

export default WebServerFactory;