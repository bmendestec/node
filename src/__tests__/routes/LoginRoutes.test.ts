import fastify from "fastify";
import redis from '../../infra/redis';
import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthController } from "../../auth/authController";
import { UserRepositoryPostgres } from "../../adapters/postgres/UserRepositoryPostgres";
import UserRepositoryInMemory from "./repository/UserRepositoryInMemory";
import { LoginRoutes } from "../../infra/web/routes/LoginRoutes";

jest.mock("../../infra/redis", () => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw'),
    quit: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
}));

const app = fastify();
const context: { token?: object } = {};
const userRepository: UserRepository = new UserRepositoryPostgres();
const authController = new AuthController(userRepository);

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
            const inputDto = { email: "bruno@gmail.com", password: "123" }
            const token = await authController.login(inputDto.email, inputDto.password);
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUIIIIIIIIIIIIIIIII: ', token);
            expect(token).toBeDefined();
            context.token = token;
        });

        it("should don't authenticate the user", async () => {
            const inputDto = { email: "bruno@gmail.com", password: "1234" }
            const token = await authController.login(inputDto.email, inputDto.password);

            expect(token).toEqual(
                expect.stringContaining('Invalid credential')
            );
        });


        // it("should validate the token received", async () => {
        //     const inputDto = { email: "bruno@gmail.com", password: "123" }
        //     const token = await authController.login(inputDto.email, inputDto.password);           
        //     const validateToken = await authController.validateToken(token);
        //     expect(validateToken).toEqual(
        //         expect.objectContaining({
        //             message: true
        //         })
        //     );
        // });

        // it("should logout the user", async () => {
        //     const inputDto = { email: "bruno@gmail.com", password: "123" }
        //     const token = await authController.login(inputDto.email, inputDto.password);

        //     const validateLogout = await authController.logout(token);
        //     expect(validateLogout).toEqual(
        //         expect.objectContaining({
        //             message: "Logged out successfully!",
        //         })
        //     );
        // });
    });
});