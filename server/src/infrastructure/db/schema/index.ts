import { group_users } from "./group_users";
import { groups } from "./groups";
import { job_logs } from "./job_logs";
import { jobs } from "./jobs";
import { service_logs } from "./service_logs";
import { services } from "./services";
import { users } from "./users";

export const schema = {
    users,
    groups,
    group_users,
    jobs,
    services,
    service_logs,
    job_logs,
}