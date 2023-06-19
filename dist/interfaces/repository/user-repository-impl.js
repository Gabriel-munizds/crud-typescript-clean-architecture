"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const fs_1 = __importDefault(require("fs"));
class UserRepositoryImpl {
    constructor() {
        const dbConfig = JSON.parse(fs_1.default.readFileSync('./src/interfaces/db.json', 'utf-8'));
        this.connection = mysql2_1.default.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
        });
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            }
            else {
                console.log('Connected to database');
            }
        });
    }
    update(user) {
        throw new Error('Method not implemented.'); // falta implementar
    }
    delete(user) {
        throw new Error('Method not implemented.'); // falta implementar
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM users', (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                }
                else {
                    const users = results.map((result) => ({
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
    create(user) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)', [user.id, user.name, user.email, user.password], (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                }
                else {
                    user.id = result.insertId.toString();
                    resolve(user);
                }
            });
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
