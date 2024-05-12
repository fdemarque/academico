import { User } from "../model/User";
import { userMock, userMock2 } from "../../tests/mock/userMock";

export class UserDatabase {
    private users: User[];

    constructor() {
        this.users = [userMock, userMock2]; // Adiciona os usuários mockados ao criar uma instância da classe
    }

    addUser(user: User) {
        this.users.push(user);
    }

    async getUserById(id: number): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            const user = this.users.find(user => user.id == id);
            if (user) {
                resolve(user);
            } else {
                reject(new Error(`User with id ${id} not found`));
            }
        });
    }

    getAllUsers(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve(this.users);
        });
    }
}
