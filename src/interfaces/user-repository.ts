import { User } from "../domain/user"

export interface UserRepository {
    getAll():Promise <User[]>;
    create(user: User): Promise<User>; 
}