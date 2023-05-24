import { Request, Response } from 'express';
import { UserService } from './../application/user-service';
import { User } from '../domain/user';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const createdUser = await this.userService.createUser(user);
    res.json(createdUser);
  }

}
