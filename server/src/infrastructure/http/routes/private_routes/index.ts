import { Router } from 'express';
import { group } from './group/group.route';
import { job } from './job/job.route';
import { service } from './service/service.routes';

export const private_routes: Router[] = [group, job, service];
