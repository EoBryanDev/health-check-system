import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../../../infrastructure/dto/ICreateUserDTO";
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from "../../../infrastructure/dto/IGroupDTO";
import { IJobInputDTO, IJobOutputDTO, IJobOutputWServiceAvailableDTO, IJobOutputWServiceDTO } from "../../../infrastructure/dto/IJobDTO";
import { IJobLogInputDTO, IJobLogOutputDTO } from "../../../infrastructure/dto/IJobLogDTO";
import { IServiceInputDTO, IServiceOutputDTO } from "../../../infrastructure/dto/IServiceDTO";
import { IServiceLogInputDTO, IServiceLogOutputDTO } from "../../../infrastructure/dto/IServiceLogDTO";
import { IQueryParams } from "../../use_cases/interfaces/IQueryParams";
import { MonitGroup } from "../MonitGroup";
import { User } from "../User";

interface IRepository {
    findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null>;

    findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null>;

    // update(user: User): Promise<void>;

    createUser(user: User): Promise<ICreateUserOutputDTO>;

    // delete(id: string): Promise<void>;

    findAllUsers(params: IQueryParams): Promise<ICreateUserOutputDTO[] | null>;

    createGroup(group: IGroupInputDTO, user_id: string): Promise<IGroupOutputDTO>;

    findGroupByName(group_name: string): Promise<IGroupOutputDTO | null>;

    findGroupById(group_id: string): Promise<IGroupOutputDTO | null>;

    findAllGroups(params: IQueryParams): Promise<IGroupOutputDTO[] | null>;

    // inativeGroup(group_id: string): Promise<void>;
    createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup>;

    findAllUserByGroupId(group_id: string, params: IQueryParams): Promise<IUserGroup[] | null>;

    findGroupMembersById(group_id: string, params: IQueryParams): Promise<IGroupOutputUsersDTO[] | null>;

    findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null>;

    createJob(job: IJobInputDTO, created_by: string): Promise<IJobOutputDTO>;

    findJobByName(job_name: string): Promise<IJobOutputDTO | null>;

    findJobById(job_id: string): Promise<IJobOutputDTO | null>;

    findAllJobs(params: IQueryParams): Promise<IJobOutputWServiceDTO[] | null>;

    findAllJobsWService(params: IQueryParams): Promise<IJobOutputWServiceAvailableDTO[] | null>;

    findAllJobsWServiceByGroup(group_id: string, params: IQueryParams): Promise<IJobOutputWServiceAvailableDTO[] | null>;

    createService(service: IServiceInputDTO, created_by: string): Promise<IServiceOutputDTO>;

    findServiceById(service_id: string): Promise<IServiceOutputDTO | null>;

    findServiceByName(service_name: string): Promise<IServiceOutputDTO | null>;

    findServicesByGroupId(group_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null>;

    findServicesByJobId(job_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null>;

    findAllServices(params: IQueryParams): Promise<IServiceOutputDTO[] | null>;

    createServiceLog(service_log_payload: IServiceLogInputDTO): Promise<void>;

    findAllServicesLogByJobName(job_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null>;

    findAllServicesLogByGroup(group_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null>;

    findServicesLogByServiceId(service_id: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null>;

    createJobLog(job_log_payload: IJobLogInputDTO): Promise<void>;

    findAllJobsLogByJobId(job_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null>;

    findAllJobsLogByGroupId(group_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null>;



}

export { IRepository };



