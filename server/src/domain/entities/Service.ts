import { IService } from "./interfaces/IService";

class Service {
    private props: IService;
    constructor(props_payload: IService) {
        const constructor_props: IService = {
            job_id: props_payload.job_id ?? undefined,
            group_id: props_payload.group_id,
            service_name: props_payload.service_name,
            service_description: props_payload.service_description ?? undefined,
            service_url: props_payload.service_url,
            rate_limit_tolerance: props_payload.rate_limit_tolerance,
            active: props_payload.active ?? true,
            created_at: props_payload.created_at ?? new Date().toISOString(),
            updated_at: props_payload.updated_at ?? undefined,
            created_by: props_payload.created_by,
        }

        this.props = constructor_props
    }

    public getServiceInfo(): IService {
        return this.props
    }
}

export { Service }