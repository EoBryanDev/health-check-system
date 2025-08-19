import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from "../../../infrastructure/dto/IGroupDTO";
import { IJobInputDTO, IJobOutputDTO } from "../../../infrastructure/dto/IJobDTO";
import { MonitGroup } from "../MonitGroup";
import { User } from "../User";

interface IRepository {
    findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null>;

    findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null>;

    // update(user: User): Promise<void>;

    createUser(user: User): Promise<ICreateUserOutputDTO>;

    // delete(id: string): Promise<void>;

    findAllUsers(): Promise<ICreateUserOutputDTO[] | null>;

    createGroup(group: IGroupInputDTO, user_id: string): Promise<IGroupOutputDTO>;

    findGroupByName(group_name: string): Promise<IGroupOutputDTO | null>;

    findGroupById(group_id: string): Promise<IGroupOutputDTO | null>;

    findAllGroups(): Promise<IGroupOutputDTO[] | null>;

    createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup>;

    findAllUserByGroupId(group_id: string): Promise<IUserGroup[] | null>;

    findGroupMembersById(group_id: string): Promise<IGroupOutputUsersDTO[] | null>;

    findJobByGroupId(group_id: string): Promise<IJobOutputDTO>;

    createJob(job: IJobInputDTO): Promise<IJobOutputDTO>;

    findJobByName(job_name: string): Promise<IJobOutputDTO>;

    findJobById(job_id: string): Promise<IJobOutputDTO>;

    findAllJobs(): Promise<IJobOutputDTO[]>;

    // inativeGroup(group_id: string): Promise<void>;


}

export { IRepository };
