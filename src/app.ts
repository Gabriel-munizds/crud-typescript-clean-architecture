import express, { Express } from 'express';
import { createRoutes } from './interfaces/routes';
import { UserController } from './interfaces/user-controller';
import { UserService } from './application/user-service';
import { UserRepositoryImpl } from './interfaces/user-repository-impl';

const app: Express = express();
const userRepository = new UserRepositoryImpl(); // Implemente UserRepositoryImpl conforme seu armazenamento de dados
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const routes = createRoutes(userController);

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
console.log('Server is running on port 3000');
});
