import { Router } from 'express';
import { home } from './home/home.route';
import { login } from './login/login.route';
import { user } from './user/user.route';

export const public_routes: Router[] = [home, login, user];
