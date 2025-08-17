import { BCryptHashPwd } from "../services/BCryptHashPwd";
import { ERoles } from "./interfaces/ERoles";
import { IUser } from "./interfaces/IUser";

class User {
    private props: IUser;
    constructor(props: IUser) {
        const constructorProps: IUser = {
            user_id: props.user_id ?? undefined,
            first_name: props.first_name,
            last_name: props.last_name,
            email: props.email,
            password: props.password,
            role: props.role ?? ERoles.ANALYST,
            active: props.active ?? true,
            cellnumber: props.cellnumber ?? undefined,
            updated_at: props.updated_at ?? undefined,
            created_at: props.created_at ?? new Date().toISOString()
        }

        this.props = constructorProps
    }

    public getUserInfo(): IUser {
        return this.props
    }

    public changeUserStatus(): void {
        const status = this.props.active!

        this.props.active = status ? false : true;

    }

    public changeRole(user_to_change: User, role: ERoles): User {
        const current_user = this.props.role!

        if (current_user === ERoles.ANALYST) {
            throw new Error("The current user does not have privileges to do this action!");
        }
        const user_to_gain_privilege = user_to_change.getUserInfo().role!

        if (current_user === ERoles.MANAGER) {
            if (user_to_gain_privilege === ERoles.MANAGER) {
                throw new Error("The current user does not have privileges to do this action!");
            }

            if (role === ERoles.ADMIN) {
                throw new Error("The current user does not have privileges to do this action!");
            }

            user_to_change.props.role = role;
            return user_to_change;

        }

        if (current_user === ERoles.ADMIN && user_to_gain_privilege === ERoles.ADMIN) {
            throw new Error("Admin can not change others admins roles!");
        }

        user_to_change.props.role = role
        return user_to_change



    }

}

export { User }