export type User = {
    id: string;
    nameUser: string;
    address: string;
    passkey: string;
    roleUser: UserRole;
    tokenAuth: string;
}

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}
