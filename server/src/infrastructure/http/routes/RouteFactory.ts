import { LoginUseCase } from "../../../domain/use_cases/LoginUseCase";
import { LoginController } from "../controllers/LoginController";
import { IRepository } from "../../../domain/entities/interfaces/IRepository";
import { IHashPassword } from "../../../domain/entities/interfaces/IHashPassword";
import { ITokenGenerator } from "../../../domain/entities/interfaces/ITokenGenerator";
import { UserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../../../domain/use_cases/CreateUserUseCase";
import { GroupController } from "../controllers/GroupController";
import { GetAllGroupsUseCase } from "../../../domain/use_cases/GetAllGroupsUseCase";
import { CreateMonitGroupUseCase } from "../../../domain/use_cases/CreateMonitGroupUseCase";

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

    public getTokenService(
    ): ITokenGenerator {

        if (!RouteFactory.instance) {
            throw new Error("RouteFactory instance not initialized. Call getInstance() first.");
        }
        return RouteFactory.instance.tokenService;
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

    public getGroupControllerInstance(): GroupController {
        return new GroupController(
            new CreateMonitGroupUseCase(this.dbConnection),
            new GetAllGroupsUseCase(this.dbConnection)
        );
    }
}

export { RouteFactory }
