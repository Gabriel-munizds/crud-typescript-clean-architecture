// interfaces/routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

export function createRoutes(userController: UserController): Router {
  const router = Router();

  router.get('/users', userController.getAllUsers.bind(userController));
  router.get('/users/:id', userController.getUserById.bind(userController));
  router.post('/signup', userController.createUser.bind(userController));
  router.put('/updateuser/:id', userController.updateUser.bind(userController));
  router.delete('/users/:id', userController.deleteUser.bind(userController));



  return router;
}