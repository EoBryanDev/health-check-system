import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from "../../../infrastructure/dto/IGroupDTO";
import { IJobInputDTO, IJobOutputDTO, IJobOutputWServiceDTO } from "../../../infrastructure/dto/IJobDTO";
import { IServiceInputDTO, IServiceOutputDTO } from "../../../infrastructure/dto/IServiceDTO";
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

    // inativeGroup(group_id: string): Promise<void>;
    createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup>;

    findAllUserByGroupId(group_id: string): Promise<IUserGroup[] | null>;

    findGroupMembersById(group_id: string): Promise<IGroupOutputUsersDTO[] | null>;

    findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null>;

    createJob(job: IJobInputDTO, created_by: string): Promise<IJobOutputDTO>;

    findJobByName(job_name: string): Promise<IJobOutputDTO | null>;

    findJobById(job_id: string): Promise<IJobOutputDTO | null>;

    findAllJobs(): Promise<IJobOutputWServiceDTO[] | null>;

    createService(service: IServiceInputDTO): Promise<IServiceOutputDTO>;

    findServiceById(service_id: string): Promise<IServiceOutputDTO | null>;

    findServiceByName(service_name: string): Promise<IServiceOutputDTO | null>;

    findServicesByGroupId(group_id: string): Promise<IServiceOutputDTO[] | null>;

    findServicesByJobId(job_id: string): Promise<IServiceOutputDTO[] | null>;

    findAllServices(): Promise<IServiceOutputDTO[] | null>;


}

export { IRepository };
