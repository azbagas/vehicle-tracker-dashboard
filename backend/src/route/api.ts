import express from 'express';
import { UserController } from '../controller/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get('/users/current', UserController.getCurrent);
apiRouter.post('/users/register', UserController.register);

export { apiRouter };

