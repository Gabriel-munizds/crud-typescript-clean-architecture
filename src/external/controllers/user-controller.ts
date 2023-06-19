import { Request, Response } from 'express';
import { UserService } from '../../application/user-service';
import { User } from '../../domain/user';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }
  async getUserById(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if(user){
      res.json(user);
    } else{
      res.status(404).json({error: 'Usuário não encontrado'});
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const createdUser = await this.userService.createUser(user);
    res.json(createdUser);
  }

  async deleteUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const success = await this.userService.deleteUser(id);
    if(success) {
      res.json({success : true});
    } else{
      res.status(404).json({error: 'Usuário não encontrado!'});
    }
  }

  async updateUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params; 
    const updateUser: User = req.body;
    const user = await this.userService.updateUser(id, updateUser);
    if(user){
      res.json(user)
    } else{
      res.status(404).json({error: 'Usuário não encontrado!'})
    }
  }

}
