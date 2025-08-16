import { describe, expect, it, vi } from 'vitest'
import { IUser } from '../interfaces/IUser'
import { ERoles } from '../interfaces/ERoles'
import { User } from '../User'

describe('User Switcase', () => {

    it('should create a new user', () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123',
            roles: ERoles.ADMIN,
            active: false,
            created_at: new Date().toISOString()
        }
        // Act

        const bryan = new User(new_user_payload)
        // Assert
        expect(bryan).toBeInstanceOf(User);
    })

    it('should return Users obrigatory props filled', () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123',
        }
        // Act

        const bryan = new User(new_user_payload)
        const bryanPropsInfo = bryan.getUserInfo();
        // Assert
        expect(bryan).toBeInstanceOf(User);
        expect(new_user_payload.first_name).toBe(bryanPropsInfo.first_name);
        expect(new_user_payload.last_name).toBe(bryanPropsInfo.last_name);
        expect(new_user_payload.email).toBe(bryanPropsInfo.email);
        expect(new_user_payload.password).toBe(bryanPropsInfo.password);
    });

    it('should return Users non obrigatory props filled or undefined', () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123'
        }
        // Act

        const bryan = new User(new_user_payload)
        const bryanPropsInfo = bryan.getUserInfo();
        // Assert
        expect(bryanPropsInfo.active).toBe(true);
        expect(bryanPropsInfo.roles).toBe(ERoles.ANALYST);
        expect(bryanPropsInfo.created_at).toBeDefined();

        expect(bryanPropsInfo.updated_at).not.toBeDefined();
        expect(bryanPropsInfo.cellnumber).not.toBeDefined();
        expect(bryanPropsInfo.user_id).not.toBeDefined();
    });
})