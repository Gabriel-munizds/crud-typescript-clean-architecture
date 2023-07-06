import express, { Express } from 'express';
import { createRoutes } from './external/routes/routes';
import { UserController } from './external/controllers/user-controller';
import { UserService } from './application/user-service';
import { UserRepositoryImpl } from './external/implementation/user-repository-impl';



const app: Express = express();
const cors = require('cors');
const userRepository = new UserRepositoryImpl();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const routes = createRoutes(userController);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001, () => {
console.log('Server is running on port 3001');
});
