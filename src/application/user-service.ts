import { User } from "../domain/user";
import { UserRepository } from "../interfaces/user-repository";

export class UserService{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<User[]>{
        return this.userRepository.getAll();
    }

    async createUser(user: User):Promise<User>{
        return this.userRepository.create(user);
    }
}