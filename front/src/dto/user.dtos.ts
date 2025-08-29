export interface ILoginUserDTO {
    data: {
        access_token: string,
        expires_in: number,
        expires_at: string
    }
}

export interface ICreateUserDTO {
    data: {
        user_id: string,
        first_name: string,
        last_name: string,
        cellnumber: string,
        email: string,
        active: boolean,
        created_at: string,
    }
}

