import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from "../../../infrastructure/dto/IGroupDTO";
import { MonitGroup } from "../MonitGroup";
import { User } from "../User";

interface IRepository {
    findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null>;

    findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null>;

    // update(user: User): Promise<void>;

    createUser(user: User): Promise<ICreateUserOutputDTO>;

    // delete(id: string): Promise<void>;

    createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup>;

    findAllUserByGroupId(group_id: string): Promise<IUserGroup[] | null>;

    findAllUsers(): Promise<ICreateUserOutputDTO[] | null>;

    createGroup(group: IGroupInputDTO, user_id: string): Promise<IGroupOutputDTO>;

    findGroupByName(group_name: string): Promise<IGroupOutputDTO | null>;

    findAllGroups(): Promise<IGroupOutputDTO[] | null>;

    findGroupById(group_id: string): Promise<IGroupOutputDTO | null>;

    findGroupMembersById(group_id: string): Promise<IGroupOutputUsersDTO[] | null>;

    // inativeGroup(group_id: string): Promise<void>;


}

export { IRepository };
