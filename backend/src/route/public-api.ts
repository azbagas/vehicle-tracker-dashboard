import express from 'express';
import { HealthController } from '../controller/health.controller';
import { UserController } from '../controller/user.controller';

const publicRouter = express.Router();

publicRouter.get('/ping', HealthController.ping);
publicRouter.post('/users', UserController.register);

export { publicRouter };
