interface IMonitGroup {
    group_id?: string;
    user_id?: string;
    group_name: string;
    group_description?: string;
    active?: boolean
    created_at?: string;
    updated_at?: string;
    created_by: string;
}

export { IMonitGroup }