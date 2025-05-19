import fastify from "fastify";
import supertest from "supertest";
import loginRoutes from "../../infra/web/routes/LoginRoutes";
import redis from '../../infra/redis';
import bcrypt from "bcrypt"
import { UserRepository } from "../../domain/repositories/UserRepository";

jest.mock("../../infra/redis", () => ({
    set: jest.fn(),
    get: jest.fn(),
    quit: jest.fn(),
}));

const app = fastify();
const context: { token?: string } = {};

describe('test the Users API', () => {

    const userRepositoryMock: UserRepository = {
        create: jest.fn(),
        list: jest.fn(),
        edit: jest.fn(),
        delete: jest.fn(),
        findByEmail: jest.fn(),
        findById: jest.fn(),
    }

    beforeAll(async () => {
        process.env.JWT_SECRET = "mysecretkey";
        await app.register(loginRoutes, { userRepository: userRepositoryMock });
        await app.ready();
    });
    afterAll(async () => {
        await app.close();
        await redis.quit();
    });

    describe("POST/login", () => {
        it("should access a protected route using the stored token", async () => {
            (userRepositoryMock.findByEmail as jest.Mock).mockResolvedValue({
                id: 34,
                email: "bruno@gmail.com",
                password: await bcrypt.hash("123", 10)
            });

            (redis.set as jest.Mock).mockResolvedValue("OK");
            (redis.get as jest.Mock).mockResolvedValue("valid-token");

            const response = await supertest(app.server)
                .post('/login')
                .send({
                    email: "bruno@gmail.com",
                    password: "123",
                });;

            context.token = response.body.token;

            console.log("Token gerado:", context.token);

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    token: response.body.token,
                }),
            );

            expect(redis.set).toHaveBeenCalledWith(
                "user:34:token",
                context.token,
                "EX",
                3600
            );

        });
        it("should validate the token received", async () => {
            const response = await supertest(app.server)
                .get('/validate-token')
                .set('Authorization', `Bearer ${context.token}`);

            expect(response.body).toEqual(
                expect.objectContaining({
                    "message": true,
                })
            );
        });
    });
});