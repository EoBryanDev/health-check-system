import { IConfigOutputDTO } from '../../../infrastructure/dto/IConfigDTO';
import {
  ICreateUserOutputDTO,
  ICreateUserOutputWPwdDTO,
} from '../../../infrastructure/dto/ICreateUserDTO';
import {
  IGroupInputDTO,
  IGroupOutputDTO,
  IGroupOutputUsersDTO,
  IUserGroupInput,
  IUserGroup,
  IGroupMembersOutputDTO,
} from '../../../infrastructure/dto/IGroupDTO';
import {
  IJobInputDTO,
  IJobOutputDTO,
  IJobOutputWServiceAvailableDTO,
  IJobOutputWServiceDTO,
} from '../../../infrastructure/dto/IJobDTO';
import {
  IJobLogInputDTO,
  IJobLogOutputDTO,
} from '../../../infrastructure/dto/IJobLogDTO';
import {
  IServiceInputDTO,
  IServiceOutputDTO,
} from '../../../infrastructure/dto/IServiceDTO';
import {
  IServiceLogInputDTO,
  IServiceLogOutputDTO,
} from '../../../infrastructure/dto/IServiceLogDTO';
import { IQueryParams } from '../../use_cases/interfaces/IQueryParams';
import { User } from '../User';

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

  findAllGroups(params: IQueryParams): Promise<IGroupOutputUsersDTO[] | null>;

  // inativeGroup(group_id: string): Promise<void>;
  createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup>;

  deleteUserFromGroup(user_id: string, group_id: string): Promise<void>;


  findAllUserByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IUserGroup[] | null>;

  findGroupMemberById(
    group_user_id: string,
    group_id: string
  ): Promise<IGroupMembersOutputDTO | null>;

  findGroupMembersByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IGroupMembersOutputDTO[] | null>;

  findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null>;

  editGroup(user_group_payload: IGroupInputDTO, user_id: string): Promise<IGroupOutputUsersDTO>;

  deleteGroup(group_id: string): Promise<void>;

  createJob(job: IJobInputDTO, created_by: string): Promise<IJobOutputDTO>;

  editJob(user_group_payload: IJobInputDTO, user_id: string): Promise<IJobOutputDTO>;

  deleteJob(job_id: string): Promise<void>;

  findJobByName(job_name: string): Promise<IJobOutputDTO | null>;

  findJobById(job_id: string): Promise<IJobOutputWServiceAvailableDTO | null>;

  findAllJobs(params: IQueryParams): Promise<IJobOutputWServiceDTO[] | null>;

  findAllJobsByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IJobOutputWServiceDTO[] | null>;

  findAllJobsWService(
    params: IQueryParams
  ): Promise<IJobOutputWServiceAvailableDTO[] | null>;

  createService(
    service: IServiceInputDTO,
    created_by: string
  ): Promise<IServiceOutputDTO>;

  editService(edit_service_payload: IServiceInputDTO, user_id: string): Promise<IServiceOutputDTO>;

  deleteService(service_id: string): Promise<void>;

  deleteServiceFromJob(service_id: string, job_id: string): Promise<void>;

  findServiceById(service_id: string): Promise<IServiceOutputDTO | null>;

  findServiceByName(service_name: string): Promise<IServiceOutputDTO | null>;

  findServicesByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IServiceOutputDTO[] | null>;

  findServicesByJobId(
    job_id: string,
    params: IQueryParams
  ): Promise<IServiceOutputDTO[] | null>;

  findAllServices(params: IQueryParams): Promise<IServiceOutputDTO[] | null>;

  createServiceLog(service_log_payload: IServiceLogInputDTO): Promise<void>;

  findAllServicesLogByJobName(
    job_name: string,
    params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null>;

  findAllServicesLogByGroup(
    group_name: string,
    params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null>;

  findServicesLogByServiceId(
    service_id: string,
    params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null>;

  createJobLog(job_log_payload: IJobLogInputDTO): Promise<void>;

  findAllJobsLogByJobId(
    job_id: string,
    params: IQueryParams
  ): Promise<IJobLogOutputDTO[] | null>;

  findAllJobsLogByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IJobLogOutputDTO[] | null>;

  findAllConfigs(): Promise<IConfigOutputDTO[] | null>;

  findConfigByName(config_name: string): Promise<IConfigOutputDTO | null>;
}

export { IRepository };
