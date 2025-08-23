import { ERoles } from '../entities/interfaces/ERoles';
import { TRole } from '../entities/interfaces/TRole';

const parseERoleTRole = (ERole: ERoles): TRole => {
  if (ERole === ERoles.ADMIN) {
    return 'ADMIN';
  }

  if (ERole === ERoles.MANAGER) {
    return 'MANAGER';
  }

  return 'ANALYST';
};

export { parseERoleTRole };
