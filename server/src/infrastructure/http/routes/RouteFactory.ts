import { LoginUseCase } from '../../../domain/use_cases/LoginUseCase';
import { LoginController } from '../controllers/LoginController';
import { IRepository } from '../../../domain/entities/interfaces/IRepository';
import { IHashPassword } from '../../../domain/services/interfaces/IHashPassword';
import { ITokenGenerator } from '../../../domain/services/interfaces/ITokenGenerator';
import { UserController } from '../controllers/UserController';
import { CreateUserUseCase } from '../../../domain/use_cases/CreateUserUseCase';
import { GetAllGroupsUseCase } from '../../../domain/use_cases/GetAllGroupsUseCase';
import { CreateMonitGroupUseCase } from '../../../domain/use_cases/CreateMonitGroupUseCase';
import { GroupController } from '../controllers/GroupController';
import { AddServiceToJobUseCase } from '../../../domain/use_cases/AddServiceToJobUseCase';
import { GetAllJobsUseCase } from '../../../domain/use_cases/GetAllJobsUseCase';
import { CreateJobUseCase } from '../../../domain/use_cases/CreateJobUseCase';
import { RunJobActiveByGroupUseCase } from '../../../domain/use_cases/RunJobActiveByGroupUseCase';
import { RunJobActiveUseCase } from '../../../domain/use_cases/RunJobActiveUseCase';
import { RunAllJobsActiveUseCase } from '../../../domain/use_cases/RunAllJobsActiveUseCase';
import { JobController } from '../controllers/JobController';

import { CreateServiceUseCase } from '../../../domain/use_cases/CreateServiceUseCase';
import { GetAllServicesUseCase } from '../../../domain/use_cases/GetAllServicesUseCase';
import { GetServiceById } from '../../../domain/use_cases/GetServiceById';
import { ServiceController } from '../controllers/ServiceController';
import { RedisCacheProvider } from '../../../domain/services/RedisCacheService';
import { GetLoginUserInfo } from '../../../domain/use_cases/GetLoginUserInfo';

class RouteFactory {
  private static instance: RouteFactory;

  constructor(
    private readonly dbConnection: IRepository,
    private readonly hashService: IHashPassword,
    private readonly tokenService: ITokenGenerator
  ) { }

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

  public getTokenService(): ITokenGenerator {
    if (!RouteFactory.instance) {
      throw new Error(
        'RouteFactory instance not initialized. Call getInstance() first.'
      );
    }
    return RouteFactory.instance.tokenService;
  }

  public getDbConnection(): IRepository {
    if (!RouteFactory.instance) {
      throw new Error(
        'RouteFactory instance not initialized. Call getInstance() first.'
      );
    }
    return RouteFactory.instance.dbConnection;
  }

  public getUserControllerInstance(): UserController {
    return new UserController(
      new CreateUserUseCase(this.dbConnection, this.hashService)
    );
  }

  public getLoginControllerInstance(): LoginController {
    return new LoginController(
      new LoginUseCase(this.dbConnection, this.hashService, this.tokenService),
      new GetLoginUserInfo(this.dbConnection)
    );
  }

  public getGroupControllerInstance(): GroupController {
    return new GroupController(
      new CreateMonitGroupUseCase(this.dbConnection),
      new GetAllGroupsUseCase(this.dbConnection)
    );
  }

  public getJobControllerInstance(): JobController {
    const cache = new RedisCacheProvider();
    return new JobController(
      new CreateJobUseCase(this.dbConnection),
      new GetAllJobsUseCase(this.dbConnection),
      new AddServiceToJobUseCase(this.dbConnection),
      new RunJobActiveByGroupUseCase(this.dbConnection, cache),
      new RunJobActiveUseCase(this.dbConnection, cache),
      new RunAllJobsActiveUseCase(this.dbConnection, cache)
    );
  }

  public getServiceControllerInstance(): ServiceController {
    return new ServiceController(
      new CreateServiceUseCase(this.dbConnection),
      new GetAllServicesUseCase(this.dbConnection),
      new GetServiceById(this.dbConnection)
    );
  }
}

export { RouteFactory };
