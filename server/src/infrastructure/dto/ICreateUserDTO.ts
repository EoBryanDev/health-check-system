import { ERoles } from "../../domain/entities/interfaces/ERoles"

interface ICreateUserInputDTO {

    first_name: string,
    last_name: string,
    email: string,
    password: string,
    cellnumber?: string,
}

interface ICreateUserOutputDTO {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    cellnumber?: string,
    created_at: string,

}

interface ICreateUserOutputWPwdDTO {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: ERoles,
    cellnumber?: string,
    created_at: string,

}

export { ICreateUserInputDTO, ICreateUserOutputDTO, ICreateUserOutputWPwdDTO }