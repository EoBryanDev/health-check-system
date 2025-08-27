import { db } from '../db/connection';
import { schema } from '../db/schema/index';
import { and, eq, inArray } from 'drizzle-orm';
import { IRepository } from '../../domain/entities/interfaces/IRepository';
import {
  IGroupInputDTO,
  IGroupOutputDTO,
  IGroupOutputUsersDTO,
  IUserGroupInput,
  IUserGroup,
  IGroupMembersOutputDTO,
} from '../dto/IGroupDTO';
import { User } from '../../domain/entities/User';
import {
  ICreateUserOutputDTO,
  ICreateUserOutputWPwdDTO,
} from '../dto/ICreateUserDTO';
import {
  IJobOutputDTO,
  IJobInputDTO,
  IJobOutputWServiceDTO,
  IJobOutputWServiceAvailableDTO,
} from '../dto/IJobDTO';
import { IServiceInputDTO, IServiceOutputDTO } from '../dto/IServiceDTO';
import { IQueryParams } from '../../domain/use_cases/interfaces/IQueryParams';
import {
  IServiceLogInputDTO,
  IServiceLogOutputDTO,
} from '../dto/IServiceLogDTO';
import { IJobLogInputDTO, IJobLogOutputDTO } from '../dto/IJobLogDTO';
import { parseTRoleERole } from '../../domain/helpers/parseTRoleERole';
import { IConfigOutputDTO } from '../dto/IConfigDTO';

class DrizzlePostgreRepository implements IRepository {
  private db;
  constructor() {
    this.db = db;
  }

  // User methods
  async findUserByEmail(
    email: string
  ): Promise<ICreateUserOutputWPwdDTO | null> {
    const user = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    if (!user[0]) return null;
    const u = user[0];
    return {
      user_id: u.user_id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      active: u.active,
      created_at: u.created_at?.toString() ?? '',
      role: parseTRoleERole(u.role),
      password: u.password,
    };
  }

  async findUserById(id: string): Promise<ICreateUserOutputWPwdDTO | null> {
    const user = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.user_id, id));
    if (!user[0]) return null;
    const u = user[0];
    return {
      user_id: u.user_id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      active: u.active,
      created_at: u.created_at?.toString() ?? '',
      role: parseTRoleERole(u.role),
      password: u.password,
    };
  }

  async createUser(user: User): Promise<ICreateUserOutputDTO> {
    const payload_user = user.getUserInfo();

    const values: typeof schema.users.$inferInsert = {
      first_name: payload_user.first_name,
      last_name: payload_user.last_name,
      email: payload_user.email,
      password: payload_user.password,
      cellnumber: payload_user.cellnumber ?? null, // se a coluna aceitar null        // se tiver pgEnum com default
      active: payload_user.active ?? true,
      // created_at: new Date(), // opcional se sua coluna tem defaultNow()
      // updated_at: new Date(),
    };
    // Converte para DTO se necessário
    const [created] = await this.db
      .insert(schema.users)
      .values(values)
      .returning();

    const response: ICreateUserOutputDTO = {
      user_id: created.user_id,
      first_name: created.first_name,
      last_name: created.last_name,
      cellnumber: created.cellnumber ?? '',
      email: created.email,
      active: created.active,
      created_at: created.created_at.toString(),
    };

    return response;
  }

  async findAllUsers(
    params: IQueryParams
  ): Promise<ICreateUserOutputDTO[] | null> {
    let users;
    if (params.active !== undefined) {
      users = await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.active, params.active));
    } else {
      users = await this.db.select().from(schema.users);
    }
    if (!users.length) return null;
    return users.map((u) => ({
      user_id: u.user_id,
      first_name: u.first_name,
      last_name: u.last_name,
      active: u.active,
      email: u.email,
      created_at: u.created_at?.toString() ?? '',
    }));
  }

  // Group methods
  async createGroup(
    group: IGroupInputDTO,
    user_id: string
  ): Promise<IGroupOutputDTO> {
    const [created] = await this.db
      .insert(schema.groups)
      .values({
        group_name: group.group_name,
        group_description: group.group_description,
        created_by: user_id,
      })
      .returning();

    const created_resp: IGroupOutputDTO = {
      group_id: created.group_id,
      group_name: created.group_name,
      group_description: created.group_description ?? '',
      active: created.active,
      created_at: created.created_at.toString(),
      updated_at: created.updated_at?.toString() ?? '',
      created_by: created.created_by,
    };
    return created_resp;
  }

  async findAllGroups(params: IQueryParams): Promise<IGroupOutputDTO[] | null> {
    const groups = await this.db
      .select()
      .from(schema.groups)
      .where(eq(schema.groups.active, params.active ?? schema.groups.active));

    // } else {
    //   console.log('2');
    //   groups = await this.db
    //     .select()
    //     .from(schema.groups);
    //   console.log(groups);
    // }

    if (!groups.length) return null;
    return groups.map((g) => ({
      group_id: g.group_id,
      group_name: g.group_name,
      group_description: g.group_description ?? '',
      active: g.active,
      created_at: g.created_at?.toString() ?? '',
      updated_at: g.updated_at?.toString() ?? '',
      created_by: g.created_by,
    }));
  }

  async findGroupById(group_id: string): Promise<IGroupOutputDTO | null> {
    const group = await this.db
      .select()
      .from(schema.groups)
      .where(eq(schema.groups.group_id, group_id));
    if (!group[0]) return null;
    const g = group[0];
    return {
      group_id: g.group_id,
      group_name: g.group_name,
      group_description: g.group_description ?? '',
      active: g.active,
      created_at: g.created_at?.toString() ?? '',
      updated_at: g.updated_at?.toString() ?? '',
      created_by: g.created_by,
    };
  }

  async findGroupMemberById(
    group_user_id: string,
    group_id?: string
  ): Promise<IGroupMembersOutputDTO | null> {

    let response
    if (group_id) {

      response = await this.db
        .select()
        .from(schema.group_users)
        .where(and(eq(schema.group_users.user_id, group_user_id), eq(schema.group_users.group_id, group_id)))

    } else {
      response = await this.db
        .select()
        .from(schema.group_users)
        .where(eq(schema.group_users.user_id, group_user_id))
    }

    if (response.length < 1) {
      return null
    }

    const user_info = await this.findUserById(response[0].user_id)

    if (!user_info) {
      return null

    }
    const returned = {
      user_name: `${user_info.first_name} ${user_info.last_name}`,
      active: true,
      email: user_info.email


    }

    return returned
  }

  async findGroupMembersByGroupId(
    group_id: string,
    _params: IQueryParams | undefined
  ): Promise<IGroupMembersOutputDTO[] | null> {

    const response = await this.db
      .select()
      .from(schema.group_users)
      .where(eq(schema.group_users.group_id, group_id))

    const returned: IGroupMembersOutputDTO[] = [];

    for (let i = 0; i < response.length; i++) {
      const group_user = response[i];

      const user_info = await this.findUserById(group_user.user_id)

      if (user_info) {

        returned.push({
          user_name: `${user_info.first_name} ${user_info.last_name}`,
          active: true,
          email: user_info.email

        })
      }
    }

    return returned
  }

  async findGroupByName(group_name: string): Promise<IGroupOutputDTO | null> {
    const group = await this.db
      .select()
      .from(schema.groups)
      .where(eq(schema.groups.group_name, group_name));
    if (!group[0]) return null;
    const g = group[0];
    return {
      group_id: g.group_id,
      group_name: g.group_name,
      group_description: g.group_description ?? '',
      active: g.active,
      created_at: g.created_at?.toString() ?? '',
      updated_at: g.updated_at?.toString() ?? '',
      created_by: g.created_by,
    };
  }

  async editGroup(user_group_payload: IGroupInputDTO, user_id: string): Promise<IGroupOutputUsersDTO> {

    const [group] = await this.db
      .select()
      .from(schema.groups)
      .where(eq(schema.groups.group_id, user_group_payload.group_id!))

    if (!group) {
      throw new Error("There was not found any group with that id");

    }
    const [updated] = await this.db
      .update(schema.groups)
      .set({
        group_name: user_group_payload.group_name ?? group.group_name,
        group_description: user_group_payload.group_description ?? group.group_description,
        active: user_group_payload.active ?? group.active,
        updated_at: new Date(),
        updated_by: user_id
      })
      .where(eq(schema.groups.group_id, user_group_payload.group_id!))
      .returning();

    const user = await this.findGroupMembersByGroupId(user_group_payload.group_id!, undefined)

    return {
      group_id: updated.group_id,
      group_name: updated.group_name,
      group_description: updated.group_description ?? '',
      user: user ? user : null,
      active: updated.active,
      created_at: updated.created_at.toString(),
      updated_at: updated.created_at.toString(),
      created_by: updated.created_by,
    }
  }

  async deleteGroup(group_id: string): Promise<void> {

    await this.db
      .delete(schema.groups)
      .where(eq(schema.groups.group_id, group_id))
  }

  async createUserGroup(
    user_group_payload: IUserGroupInput
  ): Promise<IUserGroup> {
    const [created] = await this.db
      .insert(schema.group_users)
      .values({
        user_id: user_group_payload.user_code,
        group_id: user_group_payload.group_id
      })
      .returning();

    const resp: IUserGroup = {
      group_id: created.group_id,
      user_id: created.user_id,
      created_at: created.created_at.toString(),
    };
    return resp;
  }

  async findAllUserByGroupId(
    group_id: string,
    _params: IQueryParams
  ): Promise<IUserGroup[] | null> {
    const users = await this.db
      .select()
      .from(schema.group_users)
      .where(eq(schema.group_users.group_id, group_id));

    if (users.length) {
      return null;
    }

    const response: IUserGroup[] = users.map((user) => {
      const u = user;
      return {
        group_id: u.group_id,
        user_id: u.user_id,
        created_at: u.created_at.toString(),
      };
    });
    return response;
  }

  async deleteUserFromGroup(user_id: string, group_id: string): Promise<void> {
    await this.db
      .delete(schema.group_users)
      .where(and(eq(schema.group_users.user_id, user_id), eq(schema.group_users.group_id, group_id)))
  }

  // Job methods
  async createJob(
    job: IJobInputDTO,
    created_by: string
  ): Promise<IJobOutputDTO> {
    const [created] = await this.db
      .insert(schema.jobs)
      .values({
        group_id: job.group_id,
        job_name: job.job_name,
        job_description: job.job_description,
        interval_time: job.interval_time,
        created_by,
      })
      .returning();

    const response: IJobOutputDTO = {
      job_id: created.job_id,
      group_id: created.group_id,
      job_name: created.job_name,
      interval_time: created.interval_time,
      active: created.active,
      created_at: created.created_at.toString(),
      created_by: created.created_by,
    };
    return response;
  }

  async editJob(user_job_payload: IJobInputDTO, user_id: string): Promise<IJobOutputDTO> {
    const [job] = await this.db
      .select()
      .from(schema.jobs)
      .where(eq(schema.jobs.job_id, user_job_payload.job_id!))

    if (!job) {
      throw new Error("There was not found any job with that id");

    }

    const [updated] = await this.db
      .update(schema.jobs)
      .set({

        group_id: user_job_payload.group_id ?? job.group_id,
        job_name: user_job_payload.job_name ?? job.job_name,
        job_description: user_job_payload.job_description ?? job.job_description,
        interval_time: user_job_payload.interval_time ?? job.interval_time,
        active: user_job_payload.active ?? job.active,
        updated_by: user_id,
        updated_at: new Date()
      })
      .where(eq(schema.jobs.job_id, user_job_payload.job_id!))
      .returning();

    const returning = {
      job_id: updated.job_id,
      group_id: updated.group_id,
      job_name: updated.job_name,
      job_description: updated.job_description ?? '',
      interval_time: updated.interval_time,
      active: updated.active,
      created_at: updated.created_at.toString(),
      created_by: updated.created_by,
      updated_at: updated.updated_at?.toString(),
      updated_by: updated.updated_by ?? ''
    }

    return returning



  }

  async deleteJob(job_id: string): Promise<void> {
    await this.db
      .delete(schema.jobs)
      .where(eq(schema.jobs.job_id, job_id))

  }

  async findJobById(job_id: string): Promise<IJobOutputWServiceAvailableDTO | null> {
    // 1. Buscar todos os jobs (sem filtro de group_id)
    const jobs = await this.db
      .select({
        job_id: schema.jobs.job_id,
        group_id: schema.jobs.group_id,
        job_name: schema.jobs.job_name,
        job_description: schema.jobs.job_description,
        interval_time: schema.jobs.interval_time,
        active: schema.jobs.active,
        created_at: schema.jobs.created_at,
        updated_at: schema.jobs.updated_at,
        created_by: schema.jobs.created_by,
      })
      .from(schema.jobs)
      .where(and(eq(schema.jobs.active, true), eq(schema.jobs.job_id, job_id)));

    if (jobs.length === 0) {
      return null;
    }

    // 2. Buscar todos os serviços para esses jobs
    const jobIds = jobs.map((job) => job.job_id);

    const services = await this.db
      .select({
        service_id: schema.services.service_id,
        job_id: schema.services.job_id,
        group_id: schema.services.group_id,
        service_name: schema.services.service_name,
        service_description: schema.services.service_description,
        service_url: schema.services.service_url,
        rate_limit_tolerance: schema.services.rate_limit_tolerance,
        created_at: schema.services.created_at,
        created_by: schema.services.created_by,
      })
      .from(schema.services)
      .where(inArray(schema.services.job_id, jobIds));

    // 3. Agrupar serviços por job_id
    const servicesMap = services.reduce(
      (acc, service) => {
        if (!acc[service.job_id!]) {
          acc[service.job_id!] = [];
        }
        acc[service.job_id!].push({
          service_id: service.service_id,
          group_id: service.group_id,
          service_name: service.service_name ?? '',
          service_description: service.service_description ?? '',
          service_url: service.service_url ?? '',
          rate_limit_tolerance: service.rate_limit_tolerance ?? 0,
          created_at: service.created_at?.toString() ?? '',
          created_by: service.created_by ?? '',
        } as IServiceOutputDTO);
        return acc;
      },
      {} as Record<string, IServiceOutputDTO[]>
    );

    // 4. Montar o resultado final, incluindo a lista de serviços
    const result: IJobOutputWServiceAvailableDTO[] = jobs.map((job) => ({
      job_id: job.job_id,
      group_id: job.group_id,
      job_name: job.job_name,
      job_description: job.job_description ?? '',
      interval_time: job.interval_time,
      active: job.active,
      created_at: job.created_at?.toString() ?? '',
      updated_at: job.updated_at?.toString() ?? '',
      created_by: job.created_by,
      services: servicesMap[job.job_id] || [], // Adiciona os serviços agrupados
    }));

    return result[0];
  }

  async findJobByName(job_name: string): Promise<IJobOutputDTO | null> {
    const job = await this.db
      .select()
      .from(schema.jobs)
      .where(eq(schema.jobs.job_name, job_name));

    if (!(job.length > 0)) {
      return null;
    }

    const response: IJobOutputDTO = {
      job_id: job[0].job_id,
      group_id: job[0].group_id,
      job_name: job[0].job_name,
      active: job[0].active,
      interval_time: job[0].interval_time,
      created_at: job[0].created_at.toString(),
      created_by: job[0].created_by,
    };
    return response;
  }

  async findJobByGroupId(group_id: string): Promise<IJobOutputDTO | null> {
    const job = await this.db
      .select()
      .from(schema.jobs)
      .where(eq(schema.jobs.group_id, group_id));
    if (!job) {
      return null;
    }

    const response: IJobOutputDTO = {
      job_id: job[0].job_id,
      group_id: job[0].group_id,
      job_name: job[0].job_name,
      active: job[0].active,
      interval_time: job[0].interval_time,
      created_at: job[0].created_at.toString(),
      created_by: job[0].created_by,
    };
    return response;
  }

  async findAllJobs(
    params: IQueryParams
  ): Promise<IJobOutputWServiceDTO[] | null> {
    const jobsWithServices = await this.db
      .select({
        job_id: schema.jobs.job_id,
        group_id: schema.jobs.group_id,
        job_name: schema.jobs.job_name,
        active: schema.jobs.active,
        created_at: schema.jobs.created_at,
        updated_at: schema.jobs.updated_at,
        service_id: schema.services.service_id,
        service_name: schema.services.service_name,
        created_by: schema.jobs.created_by,
        interval_time: schema.jobs.interval_time,
        service_description: schema.services.service_description,
        service_url: schema.services.service_url,
        rate_limit_tolerance: schema.services.rate_limit_tolerance,
        service_created_at: schema.services.created_at,
        service_created_by: schema.services.created_by,
      })
      .from(schema.jobs)
      .leftJoin(schema.services, eq(schema.jobs.job_id, schema.services.job_id))
      .where(
        params.active !== undefined
          ? eq(schema.jobs.active, params.active)
          : undefined
      );

    if (!jobsWithServices || jobsWithServices.length === 0) {
      return [];
    }

    // Abordagem mais simples - usando um objeto comum
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobsObj: Record<string, any> = {};

    for (const row of jobsWithServices) {
      if (!jobsObj[row.job_id]) {
        jobsObj[row.job_id] = {
          job_id: row.job_id,
          job_name: row.job_name,
          created_at: row.created_at?.toString() ?? '',
          services: [],
          group_id: row.group_id,
          interval_time: row.interval_time,
          created_by: row.created_by,
        };
      }

      if (row.service_id) {
        jobsObj[row.job_id].services.push({
          service_id: row.service_id,
          group_id: row.group_id,
          service_name: row.service_name ?? '',
          service_description: row.service_description ?? '',
          service_url: row.service_url ?? '',
          rate_limit_tolerance: row.rate_limit_tolerance ?? 0,
          created_at: row.service_created_at?.toString() ?? '',
          created_by: row.service_created_by ?? '',
        });
      }
    }

    return Object.values(jobsObj) as IJobOutputWServiceDTO[];
  }

  async findAllJobsByGroupId(
    group_id: string,
    _params: IQueryParams
  ): Promise<IJobOutputWServiceDTO[] | null> {
    // OPÇÃO 1: Duas queries separadas (mais clara e controlada)

    // 1. Buscar todos os jobs do grupo
    const jobs = await this.db
      .select({
        job_id: schema.jobs.job_id,
        group_id: schema.jobs.group_id,
        job_name: schema.jobs.job_name,
        job_description: schema.jobs.job_description,
        interval_time: schema.jobs.interval_time,
        active: schema.jobs.active,
        created_at: schema.jobs.created_at,
        updated_at: schema.jobs.updated_at,
        created_by: schema.jobs.created_by,
      })
      .from(schema.jobs)
      .where(eq(schema.jobs.group_id, group_id));

    if (!jobs || jobs.length === 0) {
      return [];
    }

    // 2. Buscar todos os serviços para esses jobs
    const jobIds = jobs.map((job) => job.job_id);

    const services = await this.db
      .select({
        service_id: schema.services.service_id,
        job_id: schema.services.job_id,
        group_id: schema.services.group_id,
        service_name: schema.services.service_name,
        service_description: schema.services.service_description,
        service_url: schema.services.service_url,
        rate_limit_tolerance: schema.services.rate_limit_tolerance,
        created_at: schema.services.created_at,
        created_by: schema.services.created_by,
      })
      .from(schema.services)
      .where(inArray(schema.services.job_id, jobIds));

    // 3. Agrupar serviços por job_id
    const servicesMap = services.reduce(
      (acc, service) => {
        if (!acc[service.job_id!]) {
          acc[service.job_id!] = [];
        }
        acc[service.job_id!].push({
          service_id: service.service_id,
          group_id: service.group_id,
          service_name: service.service_name ?? '',
          service_description: service.service_description ?? '',
          service_url: service.service_url ?? '',
          rate_limit_tolerance: service.rate_limit_tolerance ?? 0,
          created_at: service.created_at?.toString() ?? '',
          created_by: service.created_by ?? '',
        } as IServiceOutputDTO);
        return acc;
      },
      {} as Record<string, IServiceOutputDTO[]>
    );

    // 4. Montar o resultado final
    const result: IJobOutputWServiceDTO[] = jobs.map((job) => ({
      job_id: job.job_id,
      group_id: job.group_id,
      job_name: job.job_name,
      job_description: job.job_description ?? '',
      interval_time: job.interval_time,
      active: job.active,
      created_at: job.created_at?.toString() ?? '',
      updated_at: job.updated_at?.toString() ?? '',
      created_by: job.created_by,
      services: servicesMap[job.job_id] || [], // Se não tem services, array vazio
    }));

    return result;
  }

  async findAllJobsWService(
    params: IQueryParams
  ): Promise<IJobOutputWServiceAvailableDTO[] | null> {
    // 1. Buscar todos os jobs (sem filtro de group_id)
    const jobs = await this.db
      .select({
        job_id: schema.jobs.job_id,
        group_id: schema.jobs.group_id,
        job_name: schema.jobs.job_name,
        job_description: schema.jobs.job_description,
        interval_time: schema.jobs.interval_time,
        active: schema.jobs.active,
        created_at: schema.jobs.created_at,
        updated_at: schema.jobs.updated_at,
        created_by: schema.jobs.created_by,
      })
      .from(schema.jobs)
      .where(eq(schema.jobs.active, params.active!));

    if (!jobs || jobs.length === 0) {
      return [];
    }

    // 2. Buscar todos os serviços para esses jobs
    const jobIds = jobs.map((job) => job.job_id);

    const services = await this.db
      .select({
        service_id: schema.services.service_id,
        job_id: schema.services.job_id,
        group_id: schema.services.group_id,
        service_name: schema.services.service_name,
        service_description: schema.services.service_description,
        service_url: schema.services.service_url,
        rate_limit_tolerance: schema.services.rate_limit_tolerance,
        created_at: schema.services.created_at,
        created_by: schema.services.created_by,
      })
      .from(schema.services)
      .where(inArray(schema.services.job_id, jobIds));

    // 3. Agrupar serviços por job_id
    const servicesMap = services.reduce(
      (acc, service) => {
        if (!acc[service.job_id!]) {
          acc[service.job_id!] = [];
        }
        acc[service.job_id!].push({
          service_id: service.service_id,
          group_id: service.group_id,
          service_name: service.service_name ?? '',
          service_description: service.service_description ?? '',
          service_url: service.service_url ?? '',
          rate_limit_tolerance: service.rate_limit_tolerance ?? 0,
          created_at: service.created_at?.toString() ?? '',
          created_by: service.created_by ?? '',
        } as IServiceOutputDTO);
        return acc;
      },
      {} as Record<string, IServiceOutputDTO[]>
    );

    // 4. Montar o resultado final, incluindo a lista de serviços
    const result: IJobOutputWServiceAvailableDTO[] = jobs.map((job) => ({
      job_id: job.job_id,
      group_id: job.group_id,
      job_name: job.job_name,
      job_description: job.job_description ?? '',
      interval_time: job.interval_time,
      active: job.active,
      created_at: job.created_at?.toString() ?? '',
      updated_at: job.updated_at?.toString() ?? '',
      created_by: job.created_by,
      services: servicesMap[job.job_id] || [], // Adiciona os serviços agrupados
    }));

    return result;
  }

  // Service methods
  async createService(
    service: IServiceInputDTO,
    created_by: string
  ): Promise<IServiceOutputDTO> {
    const [created] = await this.db
      .insert(schema.services)
      .values({
        group_id: service.group_id,
        job_id: service.job_id,
        service_name: service.service_name,
        service_description: service.service_description,
        service_url: service.service_url,
        rate_limit_tolerance: service.rate_limit_tolerance,
        created_by,
      })
      .returning();

    const response: IServiceOutputDTO = {
      service_id: created.service_id,
      group_id: created.group_id,
      service_name: created.service_name,
      service_url: created.service_url,
      last_run: null,
      active: created.active,
      rate_limit_tolerance: created.rate_limit_tolerance,
      created_at: created.created_at.toString(),
      created_by: created.created_by,
    };
    return response;
  }

  async editService(edit_service_payload: IServiceInputDTO, user_id: string): Promise<IServiceOutputDTO> {
    const [service] = await this.db
      .select()
      .from(schema.services)
      .where(eq(schema.services.service_id, edit_service_payload.service_id!))


    if (!service) {
      throw new Error("There was not found any service with that id");

    }

    const [updated] = await this.db
      .update(schema.services)
      .set({
        group_id: edit_service_payload.group_id,
        active: edit_service_payload.active ?? service.active,
        job_id: edit_service_payload.job_id ?? service.job_id,
        last_run: edit_service_payload.last_run ?? service.last_run,
        service_name: edit_service_payload.service_name ?? service.service_name,
        service_description: edit_service_payload.service_description ?? service.service_description,
        service_url: edit_service_payload.service_url ?? service.service_url,
        rate_limit_tolerance: edit_service_payload.rate_limit_tolerance ?? service.rate_limit_tolerance,
        updated_by: user_id,
        updated_at: new Date()
      })
      .where(eq(schema.services.service_id, edit_service_payload.service_id!))
      .returning();

    const returning: IServiceOutputDTO = {
      service_id: updated.service_id!,
      group_id: updated.group_id,
      service_name: updated.service_name,
      service_url: updated.service_url,
      active: updated.active!,
      last_run: updated.last_run ? updated.last_run.toString() : null,
      rate_limit_tolerance: updated.rate_limit_tolerance,

      created_at: updated.created_at.toString(),
      created_by: updated.created_by,
    };

    return returning

  }

  async deleteServiceFromJob(service_id: string, job_id: string): Promise<void> {
    await this.db
      .delete(schema.services)
      .where(and(eq(schema.services.service_id, service_id), eq(schema.services.job_id, job_id)))
  }
  async deleteService(service_id: string): Promise<void> {
    await this.db
      .delete(schema.services)
      .where(eq(schema.services.service_id, service_id))
  }

  async findServiceById(service_id: string): Promise<IServiceOutputDTO | null> {
    const service = await this.db
      .select()
      .from(schema.services)
      .where(eq(schema.services.service_id, service_id));

    if (!(service.length > 0)) {
      return null;
    }

    const response: IServiceOutputDTO = {
      service_id: service[0].service_id,
      group_id: service[0].group_id,
      service_name: service[0].service_name,
      service_url: service[0].service_url,
      active: service[0].active,
      last_run: service[0].last_run?.toString() ?? '',
      rate_limit_tolerance: service[0].rate_limit_tolerance,
      created_at: service[0].created_at.toString(),
      created_by: service[0].created_by,
    };
    return response;
  }

  async findServiceByName(
    service_name: string
  ): Promise<IServiceOutputDTO | null> {
    const service = await this.db
      .select()
      .from(schema.services)
      .where(eq(schema.services.service_name, service_name));

    if (service.length < 1) {
      return null;
    }

    const response: IServiceOutputDTO = {
      service_id: service[0].service_id,
      group_id: service[0].group_id,
      service_name: service[0].service_name,
      service_url: service[0].service_url,
      active: service[0].active,
      last_run: service[0].last_run ? service[0].last_run.toString() : null,
      rate_limit_tolerance: service[0].rate_limit_tolerance,
      created_at: service[0].created_at.toString(),
      created_by: service[0].created_by,
    };
    return response;
  }

  async findServicesByGroupId(
    group_id: string,
    params: IQueryParams
  ): Promise<IServiceOutputDTO[] | null> {
    const services = await this.db
      .select()
      .from(schema.services)
      .where(
        params.active !== undefined
          ? and(
            eq(schema.services.group_id, group_id),
            eq(schema.services.active, params.active)
          )
          : undefined
      );

    if (!services) {
      return null;
    }

    const service_returned: IServiceOutputDTO[] = services.map((service) => {
      return {
        service_id: service.service_id,
        group_id: service.group_id,
        service_name: service.service_name,
        service_url: service.service_url,
        active: service.active,
        last_run: service.last_run!.toString() ?? '',
        rate_limit_tolerance: service.rate_limit_tolerance,
        created_at: service.created_at.toString(),
        created_by: service.created_by,
      };
    });

    return service_returned;
  }

  async findServicesByJobId(
    job_id: string,
    params: IQueryParams
  ): Promise<IServiceOutputDTO[] | null> {
    const services = await this.db
      .select()
      .from(schema.services)
      .where(
        params.active !== undefined
          ? and(
            eq(schema.services.group_id, job_id),
            eq(schema.services.active, params.active)
          )
          : undefined
      );

    if (!services) {
      return null;
    }

    const service_returned: IServiceOutputDTO[] = services.map((service) => {
      return {
        service_id: service.service_id,
        group_id: service.group_id,
        service_name: service.service_name,
        service_url: service.service_url,
        active: service.active,
        last_run: service.last_run!.toString() ?? '',
        rate_limit_tolerance: service.rate_limit_tolerance,
        created_at: service.created_at.toString(),
        created_by: service.created_by,
      };
    });

    return service_returned;
  }

  async findAllServices(
    params: IQueryParams
  ): Promise<IServiceOutputDTO[] | null> {
    let services;
    if (params.active !== undefined) {
      services = await this.db
        .select()
        .from(schema.services)
        .where(eq(schema.services.active, params.active));
    } else {
      services = await this.db.select().from(schema.services);
    }
    if (!services) {
      return null;
    }

    const service_returned: IServiceOutputDTO[] = services.map((service) => {
      return {
        service_id: service.service_id,
        group_id: service.group_id,
        service_name: service.service_name,
        service_url: service.service_url,
        active: service.active,
        last_run: service.last_run ? service.last_run.toString() : '',
        rate_limit_tolerance: service.rate_limit_tolerance,
        created_at: service.created_at.toString() ?? '',
        created_by: service.created_by,
      };
    });

    return service_returned;
  }

  // Service log methods
  async createServiceLog(
    service_log_payload: IServiceLogInputDTO
  ): Promise<void> {
    const payload: typeof schema.service_logs.$inferInsert = {
      service_id: service_log_payload.service_id,
      start_at: new Date(service_log_payload.start_at),
      duration: service_log_payload.duration,
      method: service_log_payload.method,
      status_code: service_log_payload.status_code,
      requester: service_log_payload.requester,
      device: service_log_payload.device,
      classification: service_log_payload.classification,
    };
    await this.db.insert(schema.service_logs).values(payload);
  }

  async findAllServicesLogByJobName(
    _job_name: string,
    _params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null> {
    // You may need to join jobs and service_logs tables here
    return null;
  }

  async findAllServicesLogByGroup(
    _group_name: string,
    _params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null> {
    // You may need to join groups and service_logs tables here
    return null;
  }

  async findServicesLogByServiceId(
    service_id: string,
    params: IQueryParams
  ): Promise<IServiceLogOutputDTO[] | null> {
    const logs = await this.db
      .select()
      .from(schema.service_logs)
      .where(eq(schema.service_logs.service_id, service_id))
      .limit(params.limit)
      .offset(params.offset);

    if (!logs || logs.length === 0) {
      return null;
    }

    const response: IServiceLogOutputDTO[] = logs.map((service_log) => {
      const resp: IServiceLogOutputDTO = {
        service_log_id: service_log.service_log_id,
        service_id: service_log.service_id,
        start_at: service_log.start_at.toString(),
        duration: service_log.duration,
        method: service_log.method,
        status_code: service_log.status_code,
        requester: service_log.requester,
        device: service_log.device,
        classification: service_log.classification,
      };
      return resp;
    });

    return response;
  }

  // Job log methods
  async createJobLog(job_log_payload: IJobLogInputDTO): Promise<void> {
    const payload: typeof schema.job_logs.$inferInsert = {
      job_id: job_log_payload.job_id,
      start_at: new Date(job_log_payload.start_at),
      duration: job_log_payload.duration,
    };
    await this.db.insert(schema.job_logs).values(payload);
  }

  async findAllJobsLogByJobId(
    job_id: string,
    params: IQueryParams
  ): Promise<IJobLogOutputDTO[] | null> {
    const logs = await this.db
      .select()
      .from(schema.job_logs)
      .where(eq(schema.job_logs.job_id, job_id))
      .limit(params.limit)
      .offset(params.offset);

    if (!logs || logs.length === 0) {
      return null;
    }

    const job_logs = logs.map((log) => {
      const resp: IJobLogOutputDTO = {
        job_log_id: log.job_log_id,
        job_id: log.job_id,
        start_at: log.start_at.toString(),
        duration: log.duration,
      };

      return resp;
    });

    return job_logs;
  }

  async findAllJobsLogByGroupId(
    _group_id: string,
    _params: IQueryParams
  ): Promise<IJobLogOutputDTO[] | null> {
    // You may need to join jobs and job_logs tables here
    return null;
  }

  async findAllConfigs(): Promise<IConfigOutputDTO[] | null> {
    const configs = await this.db.select().from(schema.general_configs);

    if (!(configs.length > 0)) {
      return null;
    }

    const config_return: IConfigOutputDTO[] = configs.map((config) => {
      const c: IConfigOutputDTO = {
        name: config.name,
        value: config.value,
        created_by: config.created_by,
        created_at: config.created_at.toString(),
        updated_at: config.updated_at?.toString() ?? '',
      };

      return c;
    });

    return config_return;
  }

  async findConfigByName(
    config_name: string
  ): Promise<IConfigOutputDTO | null> {
    const configs = await this.db
      .select()
      .from(schema.general_configs)
      .where(eq(schema.general_configs.name, config_name));

    if (!(configs.length > 0)) {
      return null;
    }

    const config_return: IConfigOutputDTO = {
      name: configs[0].name,
      value: configs[0].value,
      created_by: configs[0].created_by,
      created_at: configs[0].created_at.toString(),
      updated_at: configs[0].updated_at?.toString() ?? '',
    };

    return config_return;
  }
}

export { DrizzlePostgreRepository };
