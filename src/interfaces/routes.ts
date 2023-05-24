// interfaces/routes.ts
import { Router } from 'express';
import { UserController } from './user-controller';

export function createRoutes(userController: UserController): Router {
  const router = Router();

  router.get('/users', userController.getAllUsers.bind(userController));
  router.post('/users', userController.createUser.bind(userController));


  return router;
}
