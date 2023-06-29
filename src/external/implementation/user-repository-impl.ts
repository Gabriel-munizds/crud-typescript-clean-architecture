import mysql, {Connection, ResultSetHeader, RowDataPacket} from 'mysql2';
import { User } from '../../domain/user';
import { UserRepository } from '../../interfaces/repository/user-repository';
import fs from 'fs';

export class UserRepositoryImpl implements UserRepository {
  private connection: Connection;

  constructor() {
    const dbConfig = JSON.parse(fs.readFileSync('./src/interfaces/repository/implementation/dbconfig/db.json', 'utf-8'));
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
  update(id: string, updatedUser: User): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'UPDATE tab_user SET name = ?, username = ?, password = ?, about = ?, university = ?, course = ? WHERE id = ?',
        [updatedUser.name, updatedUser.username, updatedUser.password, updatedUser.about, updatedUser.university, updatedUser.course, id],
        (error, result: ResultSetHeader) => {
          if (error) {
            console.error('Erro ao atualzar:', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            resolve(null);
          } else {
            updatedUser.id = id;
            resolve(updatedUser);
          }
        }
      );
    });
  }

  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'DELETE FROM tab_user WHERE id = ?',
        [id],
        (error, result: ResultSetHeader) => {
          if (error) {
            console.error('Erro ao deletar:', error);
            reject(error);
          } else if (result.affectedRows === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM tab_user', (error, results: RowDataPacket[]) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
        } else {
          const users: User[] = results.map((result) => ({
            id: result.id,
            name: result.name,
            profilePicture: result.profilePicture,
            course: result.course,
            university: result.university,
            about: result.about,
            username: result.username,
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
        'INSERT INTO tab_user (name, course, university, about, username, password) VALUES (?, ?, ?, ?, ?, ?)',
        [user.name, user.course, user.university, user.about, user.username, user.password],
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
  getById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        'SELECT * FROM tab_user WHERE id = ?',
        [id],
        (error, results: any) => {
          if (error) {
            console.error('Error executing query:', error);
            reject(error);
          } else if (results.length === 0) {
            resolve(null);
          } else {
            const user: User = {
            id: results[0].id,
            name: results[0].name,
            profilePicture: results[0].profilePicture,
            course: results[0].course,
            university: results[0].university,
            about: results[0].about,
            username: results[0].username,
            password: results[0].password,
            };
            resolve(user);
          }
        }
      );
      });
    }
}