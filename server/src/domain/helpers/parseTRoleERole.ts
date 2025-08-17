import { ERoles } from "../entities/interfaces/ERoles"
import { TRole } from "../entities/interfaces/TRole"

const parseTRoleERole = (TRoles: TRole): ERoles => {

    if (TRoles === 'ADMIN') {
        return ERoles.ADMIN
    }

    if (TRoles === 'MANAGER') {
        return ERoles.MANAGER
    }

    return ERoles.ANALYST
}

export { parseTRoleERole }