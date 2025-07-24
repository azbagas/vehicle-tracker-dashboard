import express from 'express';
import { UserController } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { VehicleController } from '../controller/vehicle.controller';

const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get('/users/current', UserController.getCurrent);
apiRouter.post('/users/register', UserController.register);
apiRouter.delete('/users/logout', UserController.logout);

// Vehicle API
apiRouter.get('/vehicles', VehicleController.list);
apiRouter.get('/vehicles/:id', VehicleController.get);

export { apiRouter };
