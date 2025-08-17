import { ERoles } from "./ERoles"

interface IUser {
    user_id?: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    cellnumber?: string,
    role?: ERoles,
    active?: boolean,
    created_at?: string,
    updated_at?: string

}

export { IUser }