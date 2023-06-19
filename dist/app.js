"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./interfaces/routes/routes");
const user_controller_1 = require("./interfaces/controllers/user-controller");
const user_service_1 = require("./application/user-service");
const user_repository_impl_1 = require("./interfaces/repository/user-repository-impl");
const app = (0, express_1.default)();
const userRepository = new user_repository_impl_1.UserRepositoryImpl();
const userService = new user_service_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
const routes = (0, routes_1.createRoutes)(userController);
app.use(express_1.default.json());
app.use(routes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
