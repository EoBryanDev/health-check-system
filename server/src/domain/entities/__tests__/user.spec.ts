import { describe, expect, it } from 'vitest'
import { IUser } from '../interfaces/IUser'
import { ERoles } from '../interfaces/ERoles'
import { User } from '../User'

describe('User Switcase', () => {

    it('should create a new user', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123',
            role: ERoles.ADMIN,
            active: false,
            created_at: new Date().toISOString()
        }
        // Act

        const bryan = await User.create(new_user_payload)
        // Assert
        expect(bryan).toBeInstanceOf(User);
    })

    it('should return Users obrigatory props filled', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123',
        }
        // Act

        const bryan = await User.create(new_user_payload)
        const bryanPropsInfo = bryan.getUserInfo();
        // Assert
        expect(bryan).toBeInstanceOf(User);
        expect(new_user_payload.first_name).toBe(bryanPropsInfo.first_name);
        expect(new_user_payload.last_name).toBe(bryanPropsInfo.last_name);
        expect(new_user_payload.email).toBe(bryanPropsInfo.email);
        expect(bryanPropsInfo.password).toBeDefined();
    });

    it('should return Users non obrigatory props filled or undefined', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123'
        }
        // Act

        const bryan = await User.create(new_user_payload)
        const bryanPropsInfo = bryan.getUserInfo();
        // Assert
        expect(bryanPropsInfo.active).toBe(true);
        expect(bryanPropsInfo.role).toBe(ERoles.ANALYST);
        expect(bryanPropsInfo.created_at).toBeDefined();

        expect(bryanPropsInfo.updated_at).not.toBeDefined();
        expect(bryanPropsInfo.cellnumber).not.toBeDefined();
        expect(bryanPropsInfo.user_id).not.toBeDefined();
    });

    it('should be able user changer its status', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123'
        }
        // Act
        const regular_user = await User.create(new_user_payload)
        const info = regular_user.getUserInfo()

        // Assert
        expect(info.active).toBe(true)

        // Act
        regular_user.changeUserStatus()
        // Assert
        expect(info.active).toBe(false)
        // Act
        regular_user.changeUserStatus()
        // Assert
        expect(info.active).toBe(true)


    });

    it('should not be able commom user changer its role', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123'
        }
        // Act

        const common_user = await User.create(new_user_payload)

        expect(() => common_user.changeRole(common_user, ERoles.ADMIN)).toThrow('The current user does not have privileges to do this action!')
    });

    it('should be able ADMIN user incresase ANALYST user to MANAGER user', async () => {
        // Arrange
        const new_user_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            password: '123'
        }

        const new_useradmin_payload: IUser = {
            first_name: 'Mauricio',
            last_name: 'Viana',
            email: 'teste@teste.com.br',
            role: ERoles.ADMIN,
            password: '123'
        }
        // Act

        const common_user = await User.create(new_user_payload)
        const user = common_user.getUserInfo()
        expect(user.role).toBe(ERoles.ANALYST)

        const admin_user = await User.create(new_useradmin_payload)

        const userWithPriviled = admin_user.changeRole(common_user, ERoles.MANAGER)
        const priviledUser = userWithPriviled.getUserInfo()

        expect(priviledUser.role).toBe(ERoles.MANAGER)
    });
})