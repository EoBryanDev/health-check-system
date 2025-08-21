import { db } from '../db/connection';
import { schema } from '../db/schema/index'
import { and, eq, sql } from 'drizzle-orm';
import { IRepository } from '../../domain/entities/interfaces/IRepository';
import { IGroupInputDTO, IGroupOutputDTO, IGroupOutputUsersDTO, IUserGroupInput, IUserGroup } from '../dto/IGroupDTO';
import { IUser } from '../../domain/entities/interfaces/IUser';
import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from '../dto/ICreateUserDTO';
import { IJobOutputDTO, IJobInputDTO, IJobOutputWServiceDTO, IJobOutputWServiceAvailableDTO } from '../dto/IJobDTO';
import { IServiceInputDTO, IServiceOutputDTO } from '../dto/IServiceDTO';
import { IQueryParams } from '../../domain/use_cases/interfaces/IQueryParams';
import { IServiceLogInputDTO, IServiceLogOutputDTO } from '../dto/IServiceLogDTO';
import { IJobLogInputDTO, IJobLogOutputDTO } from '../dto/IJobLogDTO';

class DrizzlePostgreRepository implements IRepository {
    private db;
    constructor() {
        this.db = db;
    }

    // User methods
    async findUserByEmail(email: string): Promise<ICreateUserOutputWPwdDTO | null> {
        const user = await this.db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1);
        if (!user[0]) return null;
        return user[0];
    }

    async findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null> {
        const user = await this.db.select().from(schema.users).where(eq(schema.users.user_id, id)).limit(1);
        if (!user[0]) return null;
        return user[0];
    }

    async createUser(user: IUser): Promise<ICreateUserOutputDTO> {

        const [created] = await this.db.insert(schema.users).values(user).returning();
        return created;
    }

    async findAllUsers(params: IQueryParams): Promise<ICreateUserOutputDTO[] | null> {
        const users = await this.db.select().from(schema.users).where(params.active !== undefined ? schema.users.active.eq(params.active) : undefined);
        return users.length ? users : null;
    }

    // Group methods
    async createGroup(group: IGroupInputDTO, user_id: string): Promise<IGroupOutputDTO> {
        const [created] = await this.db.insert(schema.groups).values({ ...group, created_by: user_id }).returning();
        return created;
    }

    async findAllGroups(params: IQueryParams): Promise<IGroupOutputDTO[] | null> {
        const groups = await this.db.select().from(schema.groups).where(params.active !== undefined ? schema.groups.active.eq(params.active) : undefined);
        return groups.length ? groups : null;
    }

    async findGroupById(group_id: string): Promise<IGroupOutputDTO | null> {
        const group = await this.db.select().from(schema.groups).where(schema.groups.group_id.eq(group_id)).limit(1);
        return group[0] || null;
    }

    async findGroupByName(group_name: string): Promise<IGroupOutputDTO | null> {
        const group = await this.db.select().from(schema.groups).where(schema.groups.group_name.eq(group_name)).limit(1);
        return group[0] || null;
    }

    async createUserGroup(user_group_payload: IUserGroupInput): Promise<IUserGroup> {
        const [created] = await this.db.insert(schema.group_users).values(user_group_payload).returning();
        return created;
    }

    async findAllUserByGroupId(group_id: string, params: IQueryParams): Promise<IUserGroup[] | null> {
        const users = await this.db.select().from(schema.group_users).where(schema.group_users.group_id.eq(group_id));
        return users.length ? users : null;
    }

    // Job methods
    async createJob(job: IJobInputDTO, created_by: string): Promise<IJobOutputDTO> {
        const [created] = await this.db.insert(schema.jobs).values({ ...job, created_by }).returning();
        return created;
    }

    async findJobById(job_id: string): Promise<IJobOutputDTO | null> {
        const job = await this.db.select().from(schema.jobs).where(schema.jobs.job_id.eq(job_id)).limit(1);
        return job[0] || null;
    }

    async findJobByName(job_name: string): Promise<IJobOutputDTO | null> {
        const job = await this.db.select().from(schema.jobs).where(schema.jobs.job_name.eq(job_name)).limit(1);
        return job[0] || null;
    }

    async findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null> {
        const job = await this.db.select().from(schema.jobs).where(schema.jobs.group_id.eq(group_id)).limit(1);
        return job[0] || null;
    }

    async findAllJobs(params: IQueryParams): Promise<IJobOutputWServiceDTO[] | null> {
        const jobs = await this.db.select().from(schema.jobs).where(params.active !== undefined ? schema.jobs.active.eq(params.active) : undefined);
        return jobs.length ? jobs : null;
    }

    async findAllJobsByGroupId(group_id: string, params: IQueryParams): Promise<IJobOutputWServiceDTO[] | null> {
        const jobs = await this.db.select().from(schema.jobs).where(schema.jobs.group_id.eq(group_id));
        return jobs.length ? jobs : null;
    }

    // Service methods
    async createService(service: IServiceInputDTO, created_by: string): Promise<IServiceOutputDTO> {
        const [created] = await this.db.insert(schema.services).values({ ...service, created_by }).returning();
        return created;
    }

    async findServiceById(service_id: string): Promise<IServiceOutputDTO | null> {
        const service = await this.db.select().from(schema.services).where(schema.services.service_id.eq(service_id)).limit(1);
        return service[0] || null;
    }

    async findServiceByName(service_name: string): Promise<IServiceOutputDTO | null> {
        const service = await this.db.select().from(schema.services).where(schema.services.service_name.eq(service_name)).limit(1);
        return service[0] || null;
    }

    async findServicesByGroupId(group_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const services = await this.db.select().from(schema.services).where(schema.services.group_id.eq(group_id));
        return services.length ? services : null;
    }

    async findServicesByJobId(job_id: string, params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const services = await this.db.select().from(schema.services).where(schema.services.job_id.eq(job_id));
        return services.length ? services : null;
    }

    async findAllServices(params: IQueryParams): Promise<IServiceOutputDTO[] | null> {
        const services = await this.db.select().from(schema.services).where(params.active !== undefined ? schema.services.active.eq(params.active) : undefined);
        return services.length ? services : null;
    }

    // Service log methods
    async createServiceLog(service_log_payload: IServiceLogInputDTO): Promise<void> {
        await this.db.insert(schema.service_logs).values(service_log_payload);
    }

    async findAllServicesLogByJobName(job_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {
        // You may need to join jobs and service_logs tables here
        return null;
    }

    async findAllServicesLogByGroup(group_name: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {
        // You may need to join groups and service_logs tables here
        return null;
    }

    async findServicesLogByServiceId(service_id: string, params: IQueryParams): Promise<IServiceLogOutputDTO[] | null> {
        const logs = await this.db.select().from(schema.service_logs).where(schema.service_logs.service_id.eq(service_id));
        return logs.length ? logs : null;
    }

    // Job log methods
    async createJobLog(job_log_payload: IJobLogInputDTO): Promise<void> {
        await this.db.insert(schema.job_logs).values(job_log_payload);
    }

    async findAllJobsLogByJobId(job_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null> {
        const logs = await this.db.select().from(schema.job_logs).where(schema.job_logs.job_id.eq(job_id));
        return logs.length ? logs : null;
    }

    async findAllJobsLogByGroupId(group_id: string, params: IQueryParams): Promise<IJobLogOutputDTO[] | null> {
        // You may need to join jobs and job_logs tables here
        return null;
    }
}

export { DrizzlePostgreRepository };
