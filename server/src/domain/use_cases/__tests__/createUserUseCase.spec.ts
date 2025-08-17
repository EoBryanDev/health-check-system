import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../infrastructure/repository/InMemoryRepository';
import { CreateUserUseCase } from '../CreateUserUseCase';
import { ICreateUserInputDTO, ICreateUserOutputDTO } from '../../../infrastructure/dto/ICreateUserDTO';

describe('Create User Use Case', () => {

    it('should create an User with id', async () => {
        const testUserRepository = new InMemoryUserRepository()
        const createUserUseCase = new CreateUserUseCase(testUserRepository);

        const controller_payload: ICreateUserInputDTO = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com',
            password: '123'
        }
        const response: ICreateUserOutputDTO = await createUserUseCase.execute(controller_payload)


        expect(response.first_name).toBe(controller_payload.first_name)
        expect(response.last_name).toBe(controller_payload.last_name)
        expect(response.email).toBe(controller_payload.email)
        expect(response.user_id).toBeDefined()
        expect(response.created_at).toBeDefined()
    })

    it('should throw an error if try create an User with the same email', async () => {
        const testUserRepository = new InMemoryUserRepository()
        const createUserUseCase = new CreateUserUseCase(testUserRepository);

        const controller_payload1: ICreateUserInputDTO = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com',
            password: '123'
        }
        const response = await createUserUseCase.execute(controller_payload1)

        expect(response).toBeDefined()

        const controller_payload2: ICreateUserInputDTO = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com',
            password: '123'
        }

        expect(createUserUseCase.execute(controller_payload2)).rejects.toThrow("User email already registered!")
    })
})