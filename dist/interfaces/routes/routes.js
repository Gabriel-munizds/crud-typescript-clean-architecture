"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
// interfaces/routes.ts
const express_1 = require("express");
function createRoutes(userController) {
    const router = (0, express_1.Router)();
    router.get('/users', userController.getAllUsers.bind(userController));
    router.post('/users', userController.createUser.bind(userController));
    return router;
}
exports.createRoutes = createRoutes;
