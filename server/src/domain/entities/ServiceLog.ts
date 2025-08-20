import { IServiceLog } from "./interfaces/IServiceLog";

class ServiceLog {
    private props: IServiceLog;
    constructor(props_payload: IServiceLog) {
        const constructor_props: IServiceLog = {
            service_log_id: props_payload.service_log_id,
            service_id: props_payload.service_id,
            start_at: props_payload.start_at,
            duration: props_payload.duration,
            method: props_payload.method,
            status_code: props_payload.status_code,
            requester: props_payload.requester,
            device: props_payload.device,
            classification: props_payload.classification,
        }

        this.props = constructor_props
    }

    public getServiceLogInfo(): IServiceLog {
        return this.props
    }
}

export { ServiceLog }