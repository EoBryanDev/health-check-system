

import { IMonitGroup } from "./interfaces/IMonitGroup"

class MonitGroup {
    private props: IMonitGroup

    constructor(group_props: IMonitGroup) {
        const constructorProps: IMonitGroup = {
            group_id: group_props.group_id ?? undefined,
            user_id: group_props.user_id ?? undefined,
            group_name: group_props.group_name,
            group_description: group_props.group_description ?? undefined,
            active: group_props.active ?? true,
            created_at: group_props.created_at ?? new Date().toISOString(),
            updated_at: group_props.updated_at ?? undefined,
            created_by: group_props.created_by,
        }


        this.props = constructorProps
    }

    public getMonitGroup(): IMonitGroup {
        return this.props
    }
}

export { MonitGroup }