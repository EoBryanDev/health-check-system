export interface IGroupInputDTO {
  group_id?: string;
  group_name: string;
  active?: boolean;
  group_description?: string;
  users_email: string;
}

export interface IAddUserToGroup {
  group_id: string,
  user_code: string
}

export interface IGroupMembersOutputDTO {
  user_name: string;
  email: string;
  active: boolean;
}

export interface IGroupOutputUsersDTO {
  group_id: string;
  group_name: string;
  group_description: string;
  user: Array<IGroupMembersOutputDTO> | null
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface IUserGroupInput {
  group_id: string;
  user_code: string;
}

export interface IUserGroup {
  group_id: string;
  user_id: string;
  created_at: string;
}

export interface IGroupMembersOutputDTO {
  user_name: string;
  email: string;
  active: boolean;
}

export interface IGroupOutputUsersDTO {
  group_id: string;
  group_name: string;
  group_description: string;
  user: Array<IGroupMembersOutputDTO> | null
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

