import { IDataInToken } from '../../infrastructure/dto/IDataInToken';
import { IRepository } from '../entities/interfaces/IRepository';
import { parseERoleTRole } from '../helpers/parseERoleTRole';

class GetLoginUserInfo {
    constructor(private dbRepository: IRepository) { }

    async execute(data_in_token: IDataInToken) {
        const response = await this.dbRepository.findUserById(data_in_token.user_id);

        if (!response) {
            throw new Error('There was not found any service with the id informed.');
        }

        const real_resp = {
            user_id: response.user_id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            created_at: response.created_at,
            role: parseERoleTRole(response.role),
        }

        return real_resp;
    }
}

export { GetLoginUserInfo };
