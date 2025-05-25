import fastify from "fastify";
import redis from '../../infra/redis';
import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthController } from "../../auth/authController";
import { UserRepositoryPostgres } from "../../adapters/postgres/UserRepositoryPostgres";
import UserRepositoryInMemory from "./repository/UserRepositoryInMemory";

jest.mock("../../infra/redis", () => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw'),
    quit: jest.fn().mockResolvedValue('OK'),
}));

const app = fastify();
const context: { token?: string } = {};

describe('test the Login API', () => {


    describe("POST/login", () => {

        beforeAll(async () => {
            process.env.JWT_SECRET = "mysecretkey";
            await app.ready();
        });

        afterAll(async () => {
            await app.close();
            await redis.quit();
        });

        it("should authenticate the user", async () => {
            const userRepository: UserRepository = new UserRepositoryPostgres();
            const authController = new AuthController(userRepository);
            const input = {
                email: "bruno@gmail.com",
                password: "123"
            }
            const token = await authController.login(input.email, input.password);
            if (token === 'Invalid credential') {
                throw new Error('Invalid credential')
            }
            expect(token).toBeDefined();
        });


        it("should validate the token received", async () => {
            const userRepository: UserRepository = new UserRepositoryPostgres();
            const authController = new AuthController(userRepository);
            const input = {
                email: "bruno@gmail.com",
                password: "123"
            }
            const token = await authController.login(input.email, input.password);
            if (!token) {
                throw new Error("Token was not generated");
            }
            const validateToken = await authController.validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw');
            if (token === 'Invalid credential') {
                throw new Error('Invalid credential')
            }
            expect(validateToken).toEqual(
                expect.objectContaining({
                    "message": true,
                })
            );
        });

        it("should logout the user", async () => {
            const userRepository: UserRepository = new UserRepositoryPostgres();
            const authController = new AuthController(userRepository);
            const input = {
                email: "bruno@gmail.com",
                password: "123"
            }
            const context.token = await authController.login(input.email, input.password);
            if (!context.token) {
                throw new Error("Token was not generated");
            }

            const response = await authController.logout('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw');
            console.log(response);
            expect(response).toEqual(
                expect.objectContaining({
                    "message": "Logged out successfully",
                })
            );
        })
    });
});