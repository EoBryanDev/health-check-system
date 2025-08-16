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
            roles: props.roles ?? ERoles.ANALYST,
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

}

export { User }