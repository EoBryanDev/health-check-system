import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { IGroupOutputDTO, IGroupOutputUsersDTO } from "../../../infrastructure/dto/IGroupDTO";
import { MonitGroup } from "../MonitGroup";
import { User } from "../User";

interface IRepository {
    findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null>;

    findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null>;

    // update(user: User): Promise<void>;

    createUser(user: User): Promise<ICreateUserOutputDTO>;

    // delete(id: string): Promise<void>;

    findAllUsers(): Promise<ICreateUserOutputDTO[] | null>;

    createGroup(group: MonitGroup): Promise<IGroupOutputDTO>;

    findGroupByName(group_name: string): Promise<IGroupOutputDTO[] | null>;

    findAllGroups(): Promise<IGroupOutputDTO[] | null>;

    findGroupById(group_id: string): Promise<IGroupOutputDTO | null>;

    findGroupMembersById(group_id: string): Promise<IGroupOutputUsersDTO[] | null>;

    // inativeGroup(group_id: string): Promise<void>;


}

export { IRepository };
