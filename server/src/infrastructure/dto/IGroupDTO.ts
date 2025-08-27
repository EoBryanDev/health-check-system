/* eslint-disable @typescript-eslint/no-empty-object-type */
interface IGroupInputDTO {
  group_id?: string;
  group_name: string;
  active?: boolean;
  group_description?: string;
  users_email: string;
}

interface IAddUserToGroup {
  group_id: string,
  user_code: string
}

interface IGroupOutputDTO {
  group_id: string;
  group_name: string;
  group_description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface IUserGroupInput {
  group_id: string;
  user_code: string;
}

interface IUserGroup {
  group_id: string;
  user_id: string;
  created_at: string;
}

interface IGroupMembersOutputDTO {
  user_name: string;
  email: string;
  active: boolean;
}

interface IGroupOutputUsersDTO {
  group_id: string;
  group_name: string;
  group_description: string;
  user: Array<IGroupMembersOutputDTO> | null
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export {
  IGroupOutputDTO,
  IGroupOutputUsersDTO,
  IGroupInputDTO,
  IUserGroupInput,
  IUserGroup,
  IGroupMembersOutputDTO,
  IAddUserToGroup
};
