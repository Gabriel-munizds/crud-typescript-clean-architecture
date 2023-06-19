import { User } from "../../domain/user"

export interface UserRepository {
    delete(id: string): Promise<boolean>;
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User | null>;
    create(user: User): Promise<User>; 
    update(id: string, updateUser: User): Promise<User | null>;
}