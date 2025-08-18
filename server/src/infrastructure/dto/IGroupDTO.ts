interface IGroupInputDTO {
    group_name: string,
    group_description?: string,
    users?: Array<{
        user_email: string
    }>
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

interface IGroupOutputUsersDTO {
    group_id: string,
    group_name: string,
    group_description: string,
    user: {
        user_name: string
        email: string;
        active: boolean
    },
    active: boolean,
    created_at: string,
    updated_at: string,
    created_by: string
}

export { IGroupOutputDTO, IGroupOutputUsersDTO, IGroupInputDTO }