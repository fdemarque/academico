import { UserBusiness } from "../src/business/Userbusiness";
import { UserDatabase } from "../src/data/data";
import { userMock } from "./mock/userMock";

const userToBeTested = userMock;

describe("Testando getUserByID", () => {
    test("getUserById - Erro de usuário não existente", async () => {
        try {
            // Criando uma instância de UserDatabase com o mock de usuário
            const userDb = new UserDatabase();
            userDb.addUser(userToBeTested);

            // Criando uma instância de UserBusiness com o UserDatabase criado
            const userBusinessInstance = new UserBusiness(userDb);

            // Obtendo o usuário pelo ID
            const user = await userBusinessInstance.getUserById("5657");
        } catch (error: any) {
            expect(error.message).toBe("User with id 5657 not found");
        }
    });
    test("getUserById - O usuário existe", async () => {
        // Criando uma instância de UserDatabase com o mock de usuário
        const userDb = new UserDatabase();
        userDb.addUser(userToBeTested);

        // Criando uma instância de UserBusiness com o UserDatabase criado
        const userBusinessInstance = new UserBusiness(userDb);

        // Obtendo o usuário pelo ID existente
        const user = await userBusinessInstance.getUserById("1234");

        // Verificando se o usuário foi encontrado
        expect(user?.id).toBe(1234);
    });
    describe('Testes para getAllUsers', () => {
        // Teste para erro de não autorizado
        it('Deve lançar um erro de não autorizado', async () => {
            // Mock para a função getAllUsers da classe UserDatabase
            const mockedGetAllUsers = jest.fn();
            // Simulando que a função getAllUsers não retornou nenhum usuário
            mockedGetAllUsers.mockResolvedValue([]);

            // Mock para a instância de UserDatabase
            (UserDatabase as jest.Mock).mockImplementationOnce(() => ({
                getAllUsers: mockedGetAllUsers,
            }));

            // Testando se a função getAllUsers lança um erro de não autorizado
            await expect(getAllUsers('user')).rejects.toThrowError('Unauthorized');
        });

        // Teste para resposta de sucesso
        it('Deve retornar a lista de usuários', async () => {
            // Mock para a função getAllUsers da classe UserDatabase
            const mockedGetAllUsers = jest.fn();
            // Simulando que a função getAllUsers retornou uma lista de usuários
            mockedGetAllUsers.mockResolvedValue([
                { id: 1, name: 'User 1', email: 'user1@example.com', _role: 'admin' },
                { id: 2, name: 'User 2', email: 'user2@example.com', _role: 'user' },
            ]);

            // Mock para a instância de UserDatabase
            (UserDatabase as jest.Mock).mockImplementationOnce(() => ({
                getAllUsers: mockedGetAllUsers,
            }));

            // Testando se a função getAllUsers retorna a lista de usuários corretamente
            const users = await getAllUsers('admin');
            expect(users).toHaveLength(2);
            expect(users[0]).toHaveProperty('id', 1);
            expect(users[0]).toHaveProperty('name', 'User 1');
            expect(users[0]).toHaveProperty('email', 'user1@example.com');
            expect(users[0]).toHaveProperty('_role', 'admin');
            expect(users[1]).toHaveProperty('id', 2);
            expect(users[1]).toHaveProperty('name', 'User 2');
            expect(users[1]).toHaveProperty('email', 'user2@example.com');
            expect(users[1]).toHaveProperty('_role', 'user');
        });
    });
    function getAllUsers(arg0: string) {
        throw new Error("Function not implemented.");
}

