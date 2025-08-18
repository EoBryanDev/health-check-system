import { IRepository } from "../../domain/entities/interfaces/IRepository";
import { IGroupOutputDTO, IGroupOutputUsersDTO } from "../dto/IGroupDTO";
import { IUser } from "../../domain/entities/interfaces/IUser";
import { User } from "../../domain/entities/User";
import { ICreateUserOutputDTO, ICreateUserOutputWPwdDTO } from "../dto/ICreateUserDTO";
import { MonitGroup } from "../../domain/entities/MonitGroup";
import { IMonitGroup } from "../../domain/entities/interfaces/IMonitGroup";


class InMemoryRepository implements IRepository {


    readonly users: User[] = [];
    readonly groups: MonitGroup[] = [];

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

    async findAllUsers(): Promise<ICreateUserOutputDTO[] | null> {

        const all_users: ICreateUserOutputDTO[] = this.users.map((user) => {
            const user_info = user.getUserInfo();

            return {
                user_id: user_info.user_id!,
                first_name: user_info.first_name!,
                last_name: user_info.last_name!,
                email: user_info.email!,
                created_at: user_info.created_at!,
            }
        })

        if (all_users.length === 0) {
            return null
        }

        return all_users;
    }

    async createGroup(group: MonitGroup): Promise<IGroupOutputDTO> {
        const last_group = this.groups.findLast((group) => group.getMonitGroup().group_id! !== undefined);

        const new_id = last_group ? last_group.getMonitGroup().group_id + 'a' : 'a'

        const payload_group = group.getMonitGroup();

        const new_group_payload: IMonitGroup = {
            group_id: new_id,
            group_name: payload_group.group_name,
            group_description: payload_group.group_description,
            created_by: payload_group.created_by
        }

        const createdGroup = new MonitGroup(new_group_payload)

        this.groups.push(createdGroup);

        const group_info = createdGroup.getMonitGroup()

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
    async findAllGroups(): Promise<IGroupOutputDTO[] | null> {
        const all_groups: IGroupOutputDTO[] = this.groups.map((group) => {
            const group_info = group.getMonitGroup();

            return {
                group_id: group_info.group_id!,
                group_name: group_info.group_name!,
                group_description: group_info.group_description!,
                created_at: group_info.created_at!,
                active: group_info.active!,
                created_by: group_info.created_by!,
                updated_at: group_info.updated_at ?? '',
            }
        })

        if (all_groups.length === 0) {
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

    async findGroupMembersById(user_id: string): Promise<IGroupOutputUsersDTO[] | null> {
        const user = this.users.find(user => user.getUserInfo().user_id! === user_id)

        if (!user) {
            return null
        }

        const user_info = user.getUserInfo();

        const all_groups = this.groups.filter(group => group.getMonitGroup().user_id! === user_id).map(group => {
            const group_info = group.getMonitGroup()


            return {
                group_id: group_info.group_id!,
                group_name: group_info.group_name!,
                group_description: group_info.group_description!,
                user: {
                    user_name: `${user_info.first_name} ${user_info.last_name}`,
                    email: user_info.email,
                    active: user_info.active!,
                },
                created_at: group_info.created_at!,
                active: group_info.active!,
                created_by: group_info.created_by!,
                updated_at: group_info.updated_at ?? ''
            }

        });

        if (!all_groups) {
            return null
        }

        return all_groups;
    }

    async findGroupByName(group_name: string): Promise<IGroupOutputDTO[] | null> {
        throw new Error("Method not implemented.");
    }
    // async inativeGroup(group_id: string): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }
}

export { InMemoryRepository };
