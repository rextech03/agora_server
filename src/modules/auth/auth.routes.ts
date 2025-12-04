import { Router } from 'express';
import * as controller from './auth.controller';

export const authRoutes = Router();
authRoutes.post('/register', controller.register);
authRoutes.post('/login', controller.login);
