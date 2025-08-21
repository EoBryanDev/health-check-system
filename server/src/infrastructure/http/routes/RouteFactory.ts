import { LoginUseCase } from "../../../domain/use_cases/LoginUseCase";
import { LoginController } from "../controllers/LoginController";
import { IRepository } from "../../../domain/entities/interfaces/IRepository";
import { IHashPassword } from "../../../domain/entities/interfaces/IHashPassword";
import { ITokenGenerator } from "../../../domain/entities/interfaces/ITokenGenerator";
import { UserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../../../domain/use_cases/CreateUserUseCase";

class RouteFactory {

    private static instance: RouteFactory;

    constructor(private readonly dbConnection: IRepository,
        private readonly hashService: IHashPassword,
        private readonly tokenService: ITokenGenerator) { }

    public static getInstance(
        dbConnection: IRepository,
        hashService: IHashPassword,
        tokenService: ITokenGenerator
    ): RouteFactory {
        if (!RouteFactory.instance) {
            RouteFactory.instance = new RouteFactory(
                dbConnection,
                hashService,
                tokenService
            );
        }
        return RouteFactory.instance;
    }
    public getUserControllerInstance(): UserController {
        return new UserController(
            new CreateUserUseCase(this.dbConnection, this.hashService)
        );
    }

    public getLoginControllerInstance(): LoginController {
        return new LoginController(
            new LoginUseCase(this.dbConnection, this.hashService, this.tokenService)
        );
    }
}

export { RouteFactory }
