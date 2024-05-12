export class UserBusiness {
    private userDatabase: any;

    constructor(userDatabase: any) {
        this.userDatabase = userDatabase;
    }

    public async getUserById(id: string) {
        const user = await this.userDatabase.getUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user._role,
        };
    }

    public async getAllUsers(role: string) {
        if (role !== "admin") {
            throw new Error("Unauthorized");
        }
        
        const users = await this.userDatabase.getAllUsers();
        return users.map((user: { id: any; name: any; email: any; _role: any; }) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user._role,
        }));
    }

    public async getUserProfile(userId: string) {
        const user = await this.userDatabase.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user._role,
        };
    }
}
