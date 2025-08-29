import { describe, expect, it } from 'vitest';
import { InMemoryRepository } from '../../../infrastructure/repository/InMemoryRepository';
import { CreateUserUseCase } from '../CreateUserUseCase';
import {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
} from '../../../infrastructure/dto/ICreateUserDTO';
import { LoginUseCase } from '../LoginUseCase';
import { JwtTokenGenerator } from '../../services/JwtTokenGenerator';
import { BCryptHashPwd } from '../../services/BCryptHashPwd';
import { ILoginInputDTO } from '../../../infrastructure/dto/ILoginDTO';

describe('Login Use Case', () => {
  it('should return jsonwebtoken response', async () => {
    const createTokenService = new JwtTokenGenerator();
    const createHashService = new BCryptHashPwd();
    const testUserRepository = new InMemoryRepository();
    const createUserUseCase = new CreateUserUseCase(
      testUserRepository,
      createHashService
    );
    const loginUseCase = new LoginUseCase(
      testUserRepository,
      createHashService,
      createTokenService
    );

    const controller_payload: ICreateUserInputDTO = {
      first_name: 'Mauricio',
      last_name: 'Viana',
      email: 'teste@teste.com',
      password: '123',
    };

    await createUserUseCase.execute(controller_payload);

    const login_payload: ILoginInputDTO = {
      email: 'teste@teste.com',
      password: '123',
    };

    const response = await loginUseCase.execute(login_payload);

    expect(response.access_token).toBeDefined();
    expect(response.expires_at).toBeDefined();
    expect(response.expires_in).toBe(60);
  });

  it('should throw an error if try create an User with the same email', async () => {
    const testUserRepository = new InMemoryRepository();
    const createTokenService = new JwtTokenGenerator();
    const createHashService = new BCryptHashPwd();
    const createUserUseCase = new CreateUserUseCase(
      testUserRepository,
      createHashService
    );
    const loginUseCase = new LoginUseCase(
      testUserRepository,
      createHashService,
      createTokenService
    );

    const controller_payload: ICreateUserInputDTO = {
      first_name: 'Mauricio',
      last_name: 'Viana',
      email: 'teste@teste.com',
      password: '123',
    };

    await createUserUseCase.execute(controller_payload);

    const login_wrong_payload = {
      email: 'teste@teste.com',
      password: '1234',
    };

    expect(loginUseCase.execute(login_wrong_payload)).rejects.toThrow(
      'E-mail/Password is incorrect!'
    );
  });
});
