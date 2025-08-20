import { IRepository } from "../../domain/entities/interfaces/IRepository";
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from "../dto/IGroupDTO";
import { IUser } from "../../domain/entities/interfaces/IUser";
import { User } from "../../domain/entities/User";
import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../dto/ICreateUserDTO";
import { MonitGroup } from "../../domain/entities/MonitGroup";
import { IMonitGroup } from "../../domain/entities/interfaces/IMonitGroup";
import { IJobOutputDTO, IJobInputDTO, IJobOutputWServiceDTO, IJobOutputWServiceAvailableDTO } from "../dto/IJobDTO";
import { Job } from "../../domain/entities/Job";
import { IJob } from "../../domain/entities/interfaces/IJob";
import { IServiceInputDTO, IServiceOutputDTO } from "../dto/IServiceDTO";
import { Service } from "../../domain/entities/Service";
import { IService } from "../../domain/entities/interfaces/IService";
import { IQueryParams } from "../../domain/use_cases/interfaces/IQueryParams";
import { IServiceLogInputDTO, IServiceLogOutputDTO } from "../dto/IServiceLogDTO";
import { IJobLogInputDTO, IJobLogOutputDTO } from "../dto/IJobLogDTO";
import { group } from "console";
import { JobLog } from "../../domain/entities/JobLog";
import { ServiceLog } from "../../domain/entities/ServiceLog";


class InMemoryRepository implements IRepository {

    readonly users: User[] = [];
    readonly groups: MonitGroup[] = [];
    readonly group_users: IUserGroup[] = [];
    readonly jobs: Job[] = [];
    readonly services: Service[] = [];
    readonly service_logs: ServiceLog[] = [];
    readonly job_logs: JobLog[] = [];
    // ini - User
    async findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null> {

        const user = this.users.find(user => user.getUserInfo().email! === email) || null

        if (!user) {
            return null;
        }

        const user_info = user.getUserInfo()

        const user_dto: ICreateUserOutputWPwdDTO = {
            user_id: user_info.user_id!,
            first_name: user_info.first_name!,
            last_name: user_info.last_name!,
            email: user_info.email!,
            created_at: user_info.created_at!,
            role: user_info.role!,
            password: user_info.password!
        }
        return user_dto;
    }

    async findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null> {
        const user = this.users.find(user => user.getUserInfo().user_id! === id)

        if (!user) {
            return null
        }
        const user_info = user.getUserInfo()

        const user_dto: ICreateUserOutputWPwdDTO = {
            user_id: user_info.user_id!,
            first_name: user_info.first_name!,
            last_name: user_info.last_name!,
            email: user_info.email!,
            created_at: user_info.created_at!,
            role: user_info.role!,
            password: user_info.password!
        }

        return user_dto;
    }

    // async update(user: User): Promise<void> {
    //     const index = this.users.findIndex(u => u.getUserInfo().user_id! === user.getUserInfo().user_id!);
    //     if (index !== -1) {
    //         this.users[index] = user;
    //     }
    // }

    async createUser(user: User): Promise<ICreateUserOutputDTO> {

        const last_user = this.users.findLast((user) => user.getUserInfo().user_id !== undefined);
        const new_id = last_user ? last_user.getUserInfo().user_id + 'a' : 'a'

        const payload_user = user.getUserInfo()

        const new_user_payload: IUser = {
            user_id: new_id,
            first_name: payload_user.first_name,
            last_name: payload_user.last_name,
            email: payload_user.email,
            password: payload_user.password,
            cellnumber: payload_user.cellnumber
        }

        const createdUser = new User(new_user_payload)

        this.users.push(createdUser);

        const user_info = createdUser.getUserInfo()

        const user_dto: ICreateUserOutputDTO = {
            user_id: user_info.user_id!,
            first_name: user_info.first_name!,
            last_name: user_info.last_name!,
            active: user_info.active!,
            email: user_info.email!,
            created_at: user_info.created_at!,
        }
        return user_dto;
    }

    // async delete(id: string): Promise<void> {

    //     const index = this.users.findIndex(user => user.getUserInfo().user_id! === id);
    //     if (index !== -1) {
    //         this.users.splice(index, 1);
    //     }

    // }

    async findAllUsers(params: IQueryParams): Promise<ICreateUserOutputDTO[] | null> {

        const all_users: ICreateUserOutputDTO[] = this.users.map((user) => {
            const user_info = user.getUserInfo();

            return {
                user_id: user_info.user_id!,
                first_name: user_info.first_name!,
                last_name: user_info.last_name!,
                active: user_info.active!,
                email: user_info.email!,
                created_at: user_info.created_at!,
            }
        }).filter(user => user.active === params.active || params.active === undefined)

        if (all_users.length === 0) {
            return null
        }

        return all_users;
    }

    //  fim - User

    // ini - Group
    async createGroup(group: IGroupInputDTO, user_id: string): Promise<IGroupOutputDTO> {

        const user = this.users.find(user => user.getUserInfo().email === group.users_email)

        if (!user) {
            throw new Error("There was not found user to make bond with this group");
        }

        const user_info = user.getUserInfo();

        const last_group = this.groups.findLast((group) => group.getMonitGroup().group_id! !== undefined);

        const new_id = last_group ? last_group.getMonitGroup().group_id + 'a' : 'a'

        const new_group_payload: IMonitGroup = {
            group_id: new_id,
            group_name: group.group_name,
            group_description: group.group_description,
            created_by: user_id
        }

        const createdGroup = new MonitGroup(new_group_payload)

        this.groups.push(createdGroup);


        const group_info = createdGroup.getMonitGroup();

        const resp = await this.createUserGroup({ group_id: group_info.group_id!, user_id: group_info.created_by })

        const group_dto: IGroupOutputDTO = {
            group_id: group_info.group_id!,
            group_name: group_info.group_name!,
            group_description: group_info.group_description!,
            created_at: group_info.created_at!,
            active: group_info.active!,
            created_by: group_info.created_by!,
            updated_at: group_info.updated_at ?? ''
        }

        return group_dto;
    }

    async findAllGroups(params: IQueryParams): Promise<IGroupOutputDTO[] | null> {
        const group_filtered = this.groups.filter(group => group.getMonitGroup().active! === params.active || params.active === undefined)

        const all_groups: IGroupOutputUsersDTO[] = []

        for (let i = 0; i < group_filtered.length; i++) {
            const group = group_filtered[i];
            const group_info = group.getMonitGroup()

            let users_in_group = await this.findAllUserByGroupId(group.getMonitGroup().group_id!, params)

            if (!users_in_group) {
                users_in_group = []
            }

            all_groups.push({
                group_id: group_info.group_id!,
                group_name: group_info.group_name!,
                group_description: group_info.group_description!,
                user: users_in_group.map(group_user => {
                    const user = this.users.find(u => u.getUserInfo().user_id === group_user!.user_id);

                    if (user) {
                        return [{}]
                    }

                    const user_info = user!.getUserInfo();

                    return {
                        user_name: `${user_info.first_name} ${user_info.last_name}`,
                        email: user_info.email!,
                        active: user_info.active ?? true
                    };

                }),
                created_at: group_info.created_at!,
                active: group_info.active!,
                created_by: group_info.created_by!,
                updated_at: group_info.updated_at ?? ''
            })
        }



        if (!all_groups) {
            return null
        }

        return all_groups;
    }

    async findGroupById(group_id: string): Promise<IGroupOutputDTO | null> {
        const group = this.groups.find(group => group.getMonitGroup().group_id! === group_id)

        if (!group) {
            return null
        }
        const group_info = group.getMonitGroup()

        const group_dto: IGroupOutputDTO = {
            group_id: group_info.group_id!,
            group_name: group_info.group_name!,
            group_description: group_info.group_description!,
            created_at: group_info.created_at!,
            active: group_info.active!,
            created_by: group_info.created_by!,
            updated_at: group_info.updated_at ?? ''
        }

        return group_dto;
    }

    async findGroupMembersById(user_id: string, params: IQueryParams): Promise<IGroupOutputUsersDTO[] | null> {
        const user = this.users.find(user => user.getUserInfo().user_id! === user_id)

        if (!user) {
            return null
        }

        const group_filtered = this.groups.filter(group => group.getMonitGroup().user_id! === user_id && group.getMonitGroup()!.active === params.active || params.active === undefined)

        const all_groups: IGroupOutputUsersDTO[] = []

        for (let i = 0; i < group_filtered.length; i++) {
            const group = group_filtered[i];
            const group_info = group.getMonitGroup()

            let users_in_group = await this.findAllUserByGroupId(group.getMonitGroup().group_id!, params)

            if (!users_in_group) {
                users_in_group = []
            }

            all_groups.push({
                group_id: group_info.group_id!,
                group_name: group_info.group_name!,
                group_description: group_info.group_description!,
                user: users_in_group.map(group_user => {
                    const user = this.users.find(u => u.getUserInfo().user_id === group_user!.user_id);

                    if (user) {
                        return [{}]
                    }

                    const user_info = user!.getUserInfo();

                    return {
                        user_name: `${user_info.first_name} ${user_info.last_name}`,
                        email: user_info.email!,
                        active: user_info.active ?? true
                    };

                }),
                created_at: group_info.created_at!,
                active: group_info.active!,
                created_by: group_info.created_by!,
                updated_at: group_info.updated_at ?? ''
            })
        }



        if (!all_groups) {
            return null
        }

        return all_groups;
    }

    async findGroupByName(group_name: string): Promise<IGroupOutputDTO | null> {

        const groups = this.groups.find(group => group.getMonitGroup().group_name === group_name);

        if (!groups) {
            return null
        }
        const group_info = groups?.getMonitGroup()

        const group_dto: IGroupOutputDTO = {
            group_id: group_info.group_id!,
            group_name: group_info.group_name!,
            group_description: group_info.group_description!,
            created_at: group_info.created_at!,
            active: group_info.active!,
            created_by: group_info.created_by!,
            updated_at: group_info.updated_at ?? ''
        }

        return group_dto;

    }

    async createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup> {
        const user_group: IUserGroup = {
            created_at: new Date().toISOString(),
            ...user_group_payload
        }
        this.group_users.push(user_group)

        return user_group;
    }

    async findAllUserByGroupId(group_id: string, params: IQueryParams): Promise<IUserGroup[] | null> {
        const users_group = await this.findAllUserByGroupId(group_id, params)

        if (!users_group) {
            return null
        }

        return users_group
    }
    // async inativeGroup(group_id: string): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }

    // fim - Group
    // ini - Jobs

    async createJob(job: IJobInputDTO, created_by: string): Promise<IJobOutputDTO> {

        const new_id = 'a'

        const job_payload: IJob = {
            group_id: new_id,
            job_name: job.job_name,
            interval_time: job.interval_time,
            created_by
        }
        const new_job = new Job(job_payload)

        this.jobs.push(new_job)

        const new_job_info = new_job.getJobInfo();

        const createJobOutput: IJobOutputDTO = {
            job_id: new_job_info.job_id!,
            group_id: new_job_info.group_id,
            job_name: new_job_info.job_name,
            interval_time: new_job_info.interval_time,
            created_at: new_job_info.created_at!,
            created_by: new_job_info.created_by
        }

        return createJobOutput

    }

    async findJobById(job_id: string): Promise<IJobOutputDTO | null> {
        const job = this.jobs.find(job => job.getJobInfo().job_id! === job_id)

        if (!job) {
            return null;
        }

        const job_info = job?.getJobInfo()

        const job_output: IJobOutputDTO = {
            job_id: job_info.job_id!,
            group_id: job_info.group_id,
            job_name: job_info.job_name,
            interval_time: job_info.interval_time,
            created_at: job_info.created_at!,
            created_by: job_info.created_by
        }

        return job_output

    }

    async findJobByName(job_name: string): Promise<IJobOutputDTO | null> {
        const job = this.jobs.find(job => job.getJobInfo().job_name === job_name)

        if (!job) {
            return null;
        }

        const job_info = job?.getJobInfo()

        const job_output: IJobOutputDTO = {
            job_id: job_info.job_id!,
            group_id: job_info.group_id,
            job_name: job_info.job_name,
            interval_time: job_info.interval_time,
            created_at: job_info.created_at!,
            created_by: job_info.created_by
        }

        return job_output
    }

    async findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null> {
        const job = this.jobs.find(job => job.getJobInfo().group_id === group_id)

        if (!job) {
            return null;
        }

        const job_info = job?.getJobInfo()

        const job_output: IJobOutputDTO = {
            job_id: job_info.job_id!,
            group_id: job_info.group_id,
            job_name: job_info.job_name,
            interval_time: job_info.interval_time,
            created_at: job_info.created_at!,
            created_by: job_info.created_by
        }

        return job_output
    }

    async findAllJobs(params: IQueryParams): Promise<IJobOutputWServiceDTO[] | null> {
        const job_filtered = this.jobs.filter(job => job.getJobInfo().active! === params.active || params.active === undefined)

        const all_jobs: IJobOutputWServiceDTO[] = []

        for (let i = 0; i < job_filtered.length; i++) {
            const job = job_filtered[i];
            const job_info = job.getJobInfo()

            // depois implementar os services que contem job id

            let services_in_job = await this.findServicesByJobId(job_info.job_id!, params)

            if (!services_in_job) {
                services_in_job = []
            }

            all_jobs.push({
                group_id: job_info.group_id!,
                job_id: job_info.job_id!,
                job_name: job_info.job_name!,
                job_description: job_info.job_description!,
                interval_time: job_info.interval_time,
                services: services_in_job.map(service => {
                    return {
                        service_id: service.service_id,
                        group_id: service.group_id,
                        job_id: service.job_id!,
                        service_name: service.service_name,
                        service_description: service.service_description ?? '',
                        service_url: service.service_url,
                        rate_limit_tolerance: service.rate_limit_tolerance,
                        created_at: service.created_at,
                        created_by: service.created_by,
                    }
                }),
                created_at: job_info.created_at!,
                created_by: job_info.created_by!
            })
        }

        if (!all_jobs) {
            return null
        }

        return all_jobs;
    }

    async findAllJobsWService(params: IQueryParams): Promise<IJobOutputWServiceAvailableDTO[] | null> {
        const job_filtered = this.jobs.filter(job => job.getJobInfo().active! === params.active || params.active === undefined)

        const all_jobs: IJobOutputWServiceDTO[] = []

        for (let i = 0; i < job_filtered.length; i++) {
            const job = job_filtered[i];
            const job_info = job.getJobInfo()

            // depois implementar os services que contem job id

            let services_in_job = await this.findServicesByJobId(job_info.job_id!, params)

            if (!services_in_job) {
                services_in_job = []
            }

            all_jobs.push({
                group_id: job_info.group_id!,
                job_id: job_info.job_id!,
                job_name: job_info.job_name!,
                job_description: job_info.job_description!,
                interval_time: job_info.interval_time,
                services: services_in_job.map(service => {
                    return {
                        service_id: service.service_id,
                        group_id: service.group_id,
                        job_id: service.job_id!,
                        service_name: service.service_name,
                        service_description: service.service_description ?? '',
                        service_url: service.service_url,
                        rate_limit_tolerance: service.rate_limit_tolerance,
                        created_at: service.created_at,
                        created_by: service.created_by,
                    }
                }),
                created_at: job_info.created_at!,
                created_by: job_info.created_by!
            })
        }

        const filtered_job = all_jobs.filter(all_job => all_job.services.length >= 1)

        if (!filtered_job) {
            return null
        }

        return filtered_job;
    }

    async findAllJobsWServiceByGroup(group_id: string, params: IQueryParams): Promise<IJobOutputWServiceAvailableDTO[] | null> {
        const job_filtered = this.jobs.filter(job => job.getJobInfo().active! === params.active || params.active === undefined).filter(job => job.getJobInfo().group_id === group_id)

        const all_jobs: IJobOutputWServiceDTO[] = []

        for (let i = 0; i < job_filtered.length; i++) {
            const job = job_filtered[i];
            const job_info = job.getJobInfo()

            // depois implementar os services que contem job id

            let services_in_job = await this.findServicesByJobId(job_info.job_id!, params)

            if (!services_in_job) {
                services_in_job = []
            }

            all_jobs.push({
                group_id: job_info.group_id!,
                job_id: job_info.job_id!,
                job_name: job_info.job_name!,
                job_description: job_info.job_description!,
                interval_time: job_info.interval_time,
                services: services_in_job.map(service => {
                    return {
                        service_id: service.service_id,
                        group_id: service.group_id,
                        job_id: service.job_id!,
                        service_name: service.service_name,
                        service_description: service.service_description ?? '',
                        service_url: service.service_url,
                        rate_limit_tolerance: service.rate_limit_tolerance,
                        created_at: service.created_at,
                        created_by: service.created_by,
                    }
                }),
                created_at: job_info.created_at!,
                created_by: job_info.created_by!
            })
        }

        const filtered_job = all_jobs.filter(all_job => all_job.services.length >= 1)

        if (!filtered_job) {
            return null
        }

        return filtered_job;
    }
    // fim - Jobs

    // ini - Service

    async createService(service: IServiceInputDTO, created_by: string): Promise<IServiceOutputDTO> {
        const groups = await this.findGroupByName(service.group_name)

        if (!groups) {
            throw new Error("There was not found any group valid for this service!");
        }

        if (service.job_name) {
            const jobs = await this.findJobByName(service.job_name)

            if (!jobs) {
                throw new Error("There was not found any job valid for this service!");
            }

        }

        const new_id = 'a'

        const service_payload: IService = {
            service_id: new_id,
            group_id: service.group_id,
            job_id: service.job_id,
            service_name: service.service_name,
            service_description: service.service_name,
            service_url: service.service_url,
            rate_limit_tolerance: service.rate_limit_tolerance,
            created_by
        }
        const new_service = new Service(service_payload)

        this.services.push(new_service)

        const new_service_info = new_service.getServiceInfo();

        const createJobOutput: IServiceOutputDTO = {
            service_id: new_id,
            job_id: new_service_info.job_id!,
            group_id: new_service_info.group_id,
            service_name: new_service_info.service_name,
            service_description: new_service_info.service_description,
            service_url: new_service_info.service_url,
            rate_limit_tolerance: new_service_info.rate_limit_tolerance,
            created_at: new_service_info.created_at!,
            created_by: new_service_info.created_by
        }

        return createJobOutput
    }

    async findServiceById(service_id: string): Promise<IServiceOutputDTO | null> {
        const service = this.services.find(service => service.getServiceInfo().service_id! === service_id)

        if (!service) {
            return null;
        }

        const service_info = service?.getServiceInfo()

        const service_output: IServiceOutputDTO = {
            service_id: service_info.service_id!,
            job_id: service_info.job_id!,
            group_id: service_info.group_id,
            service_name: service_info.service_name,
            service_description: service_info.service_description,
            service_url: service_info.service_url,
            rate_limit_tolerance: service_info.rate_limit_tolerance,
            created_at: service_info.created_at!,
            created_by: service_info.created_by
        }

        return service_output
    }

    async findServiceByName(service_name: string): Promise<IServiceOutputDTO | null> {
        const service = this.services.find(service => service.getServiceInfo().service_name! === service_name)

        if (!service) {
            return null;
        }

        const service_info = service?.getServiceInfo()

        const service_output: IServiceOutputDTO = {
            service_id: service_info.service_id!,
            job_id: service_info.job_id!,
            group_id: service_info.group_id,
            service_name: service_info.service_name,
            service_description: service_info.service_description,
            service_url: service_info.service_url,
            rate_limit_tolerance: service_info.rate_limit_tolerance,
            created_at: service_info.created_at!,
            created_by: service_info.created_by
        }

        return service_output
    }

    async findServicesByGroupId(group_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const services = this.services.filter(service => service.getServiceInfo().group_id! === group_id && service.getServiceInfo().active! === params.active || params.active === undefined)

        if (services.length === 0) {
            return null;
        }

        const services_output = services.map(service => {
            const service_info = service?.getServiceInfo()

            return {
                service_id: service_info.service_id!,
                job_id: service_info.job_id!,
                group_id: service_info.group_id,
                service_name: service_info.service_name,
                service_description: service_info.service_description,
                service_url: service_info.service_url,
                rate_limit_tolerance: service_info.rate_limit_tolerance,
                created_at: service_info.created_at!,
                created_by: service_info.created_by
            }
        })

        return services_output
    }

    async findServicesByJobId(job_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const services = this.services.filter(service => service.getServiceInfo().job_id! === job_id && service.getServiceInfo().active! === params.active || params.active === undefined)

        if (services.length === 0) {
            return null;
        }

        const services_output = services.map(service => {
            const service_info = service?.getServiceInfo()

            return {
                service_id: service_info.service_id!,
                job_id: service_info.job_id!,
                group_id: service_info.group_id,
                service_name: service_info.service_name,
                service_description: service_info.service_description,
                service_url: service_info.service_url,
                rate_limit_tolerance: service_info.rate_limit_tolerance,
                created_at: service_info.created_at!,
                created_by: service_info.created_by
            }
        })

        return services_output
    }

    async findAllServices(params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const service_filtered = this.services.filter(service => service.getServiceInfo()!.active === params.active || params.active === undefined)

        if (service_filtered.length === 0) {
            return null
        }

        const services_output = service_filtered.map(service => {
            const service_info = service?.getServiceInfo()

            return {
                service_id: service_info.service_id!,
                job_id: service_info.job_id!,
                group_id: service_info.group_id,
                service_name: service_info.service_name,
                service_description: service_info.service_description,
                service_url: service_info.service_url,
                rate_limit_tolerance: service_info.rate_limit_tolerance,
                created_at: service_info.created_at!,
                created_by: service_info.created_by
            }
        })

        return services_output
    }

    // fim - Service

    // ini - Service log

    async createServiceLog(service_log_payload: IServiceLogInputDTO): Promise<void> {
        const last_service_id = this.service_logs.findLast((job) => job.getServiceLogInfo().service_log_id !== undefined);
        const new_id = last_service_id ? last_service_id.getServiceLogInfo().service_log_id + 'a' : 'a'

        const service_payload = {
            service_log_id: new_id,
            ...service_log_payload
        }

        const createdServiceLog = new ServiceLog(service_payload)

        this.service_logs.push(createdServiceLog)
    }

    async findAllServicesLogByJobName(job_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {

        const job = await this.findJobByName(job_name);

        if (!job) {
            return null
        }
        const services = await this.findServicesByJobId(job.job_id, params)

        if (!services) {
            return null
        }

        let all_service_logs: IServiceLogOutputDTO[] = []

        for (let i = 0; i < services.length; i++) {
            const service = services[i];

            const service_logs = this.service_logs.filter(service_log => service_log.getServiceLogInfo().service_id === service.service_id)

            for (let j = 0; j < service_logs.length; j++) {
                const service_log = service_logs[j];

                const service_log_info = service_log.getServiceLogInfo()

                const service_log_dto: IServiceLogOutputDTO = {
                    service_log_id: service_log_info.service_log_id,
                    service_id: service_log_info.service_id,
                    start_at: service_log_info.start_at,
                    duration: service_log_info.duration,
                    method: service_log_info.method,
                    status_code: service_log_info.status_code,
                    requester: service_log_info.requester,
                    device: service_log_info.device,
                    classification: service_log_info.classification,
                }

                all_service_logs.push(service_log_dto)
            }

        }

        if (!all_service_logs) {
            return null;
        }

        return all_service_logs
    }

    async findAllServicesLogByGroup(group_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {
        const group = await this.findGroupByName(group_name);

        if (!group) {
            return null
        }
        const services = await this.findServicesByGroupId(group.group_id, params)

        if (!services) {
            return null
        }

        let all_service_logs: IServiceLogOutputDTO[] = []

        for (let i = 0; i < services.length; i++) {
            const service = services[i];

            const service_logs = this.service_logs.filter(service_log => service_log.getServiceLogInfo().service_id === service.service_id)

            for (let j = 0; j < service_logs.length; j++) {
                const service_log = service_logs[j];

                const service_log_info = service_log.getServiceLogInfo()

                const service_log_dto: IServiceLogOutputDTO = {
                    service_log_id: service_log_info.service_log_id,
                    service_id: service_log_info.service_id,
                    start_at: service_log_info.start_at,
                    duration: service_log_info.duration,
                    method: service_log_info.method,
                    status_code: service_log_info.status_code,
                    requester: service_log_info.requester,
                    device: service_log_info.device,
                    classification: service_log_info.classification,
                }

                all_service_logs.push(service_log_dto)
            }

        }

        if (!all_service_logs) {
            return null;
        }

        return all_service_logs
    }

    async findServicesLogByServiceId(service_id: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {

        const services = await this.findServiceById(service_id)

        if (!services) {
            return null
        }

        const service_logs = this.service_logs.filter(service_log => service_log.getServiceLogInfo().service_id === service_id)
        let all_service_logs: IServiceLogOutputDTO[] = []
        for (let j = 0; j < service_logs.length; j++) {
            const service_log = service_logs[j];

            const service_log_info = service_log.getServiceLogInfo()

            const service_log_dto: IServiceLogOutputDTO = {
                service_log_id: service_log_info.service_log_id,
                service_id: service_log_info.service_id,
                start_at: service_log_info.start_at,
                duration: service_log_info.duration,
                method: service_log_info.method,
                status_code: service_log_info.status_code,
                requester: service_log_info.requester,
                device: service_log_info.device,
                classification: service_log_info.classification,
            }

        }

        if (!all_service_logs) {
            return null;
        }

        return all_service_logs
    }


    // fim - Service log

    // ini - Job log
    async createJobLog(job_log_payload: IJobLogInputDTO): Promise<void> {
        const last_job_id = this.job_logs.findLast((job) => job.getJobLogInfo().job_log_id !== undefined);
        const new_id = last_job_id ? last_job_id.getJobLogInfo().job_log_id + 'a' : 'a'

        const job_log = {
            job_log_id: new_id,
            ...job_log_payload
        }

        const new_job_log = new JobLog(job_log)
        this.job_logs.push(new_job_log)
    }

    async findAllJobsLogByJobId(job_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null> {
        const all_jobs = this.job_logs.filter(job_log => job_log.getJobLogInfo().job_id === job_id)

        if (!all_jobs) {
            return null
        }

        const job_log_output: IJobLogOutputDTO[] = all_jobs.map(jobLog => {
            const info = jobLog.getJobLogInfo();
            return {
                job_log_id: info.job_log_id!,
                job_id: info.job_id!,
                start_at: info.start_at!,
                duration: info.duration!
            };
        });

        return job_log_output;

    }

    async findAllJobsLogByGroupId(group_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null> {
        const jobsByGroup = await this.findAllJobsLogByGroupId(group_id, params);

        if (!jobsByGroup) {
            return null
        }

        let all_jobs = [];

        for (let i = 0; i < jobsByGroup.length; i++) {
            const jobGroup = jobsByGroup[i];

            const job_logs_by_job_id = await this.findAllJobsLogByJobId(jobGroup.job_id, params)

            if (job_logs_by_job_id) {

                for (let j = 0; j < job_logs_by_job_id.length; j++) {
                    const job_log = job_logs_by_job_id[j];

                    all_jobs.push(job_log)
                }
            }

        }

        if (!all_jobs) {
            return null
        }

        return all_jobs

    }

    // fim - Job log

}

export { InMemoryRepository };