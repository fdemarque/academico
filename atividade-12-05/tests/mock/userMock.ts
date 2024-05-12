import { User } from "../../src/model/User";
import { USER_ROLES } from "../../src/types/UserRole";

const userDefault: USER_ROLES = "user";
const userAdmin: USER_ROLES = "admin";

export const userMock: User = new User(
    1234,
    "flavio",
    "flavio@lab.com",
    "flavio123",
    userDefault
);

export const userMock2: User = new User(
    12345,
    "flaivo",
    "flaivo@lab.com",
    "flaivo123",
    userAdmin
);
