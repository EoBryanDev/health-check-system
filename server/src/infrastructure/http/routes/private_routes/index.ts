import { Router } from 'express';
import { group } from './group/group.route';
import { job } from './job/job.route';
import { service } from './service/service.routes';
import { login } from './login/login.route';

export const private_routes: Router[] = [login, group, job, service];
