import { TRole } from '../../domain/entities/interfaces/TRole';

interface IDataInToken {
  role: TRole;
  user_id: string;
}

export { IDataInToken };
