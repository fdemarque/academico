import { USER_ROLES } from "../../src/types/UserRole";

export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _role: USER_ROLES;

    constructor(id: number, name: string, email: string, password: string, role: USER_ROLES) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get role(): USER_ROLES {
        return this._role;
    }

    set role(role: USER_ROLES) {
        this._role = role;
    }
}
