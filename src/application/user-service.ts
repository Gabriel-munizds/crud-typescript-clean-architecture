import { User } from "../domain/user";
import { UserRepository } from "../interfaces/repository/user-repository";

export class UserService{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }
    async getAllUsers(): Promise<User[]>{
        return this.userRepository.getAll();
    }
    async getUserById(id: string):Promise<User | null>{
        return this.userRepository.getById(id);
    }

    async createUser(user: User):Promise<User>{
        return this.userRepository.create(user);
    }

    async deleteUser(id: string): Promise<boolean>{
        return this.userRepository.delete(id);
    }
    
    async updateUser(id: string, updateUser: User): Promise<User | null>{
        return this.userRepository.update(id, updateUser);
    }
}