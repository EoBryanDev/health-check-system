import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../../../infrastructure/repository/InMemoryRepository';

describe('Create User Use Case', () => {
    const testUserRepository = new InMemoryUserRepository()

    it('should create an User with', () => {

        expect(1).toBe(1)
    })

    it('should throw an error if try create an User with the same email', () => {

        expect(1).toBe(1)
    })
})