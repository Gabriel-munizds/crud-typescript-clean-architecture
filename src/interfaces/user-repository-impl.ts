import mysql, {Connection, RowDataPacket} from 'mysql2';
import { User } from '../domain/user';
import { UserRepository } from './user-repository';
import fs from 'fs';

export class UserRepositoryImpl implements UserRepository {
  private connection: Connection;

  constructor() {
    const dbConfig = JSON.parse(fs.readFileSync('./src/interfaces/db.json', 'utf-8'));
    this.connection = mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
      } else {
        console.log('Connected to database');
      }
    });
  }

  getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM users', (error, results: RowDataPacket[]) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
        } else {
          const users: User[] = results.map((result) => ({
            id: result.id,
            name: result.name,
            email: result.email,
            password: result.password,
          }));
          resolve(users);
        }
      });
    });
  }
  create(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.email, user.password],
        (error, result:any) => {
          if (error) {
            console.error('Error executing query:', error);
            reject(error);
          } else {
            user.id = result.insertId.toString();
            resolve(user);
          }
        }
      );
    });
  }
}
