interface IGroupInputDTO {
    group_name: string,
    group_description?: string,
    users_email: string
}

interface IGroupOutputDTO {
    group_id: string,
    group_name: string,
    group_description: string,
    active: boolean,
    created_at: string,
    updated_at: string,
    created_by: string
}

interface IUserGroupInput {
    group_id: string,
    user_id: string
}

interface IUserGroup {
    group_id: string,
    user_id: string,
    created_at: string
}

interface IGroupOutputUsersDTO {
    group_id: string,
    group_name: string,
    group_description: string,
    user: Array<{
        user_name: string
        email: string;
        active: boolean
    }> | Array<{}>,
    active: boolean,
    created_at: string,
    updated_at: string,
    created_by: string
}

export { IGroupOutputDTO, IGroupOutputUsersDTO, IGroupInputDTO, IUserGroupInput, IUserGroup }