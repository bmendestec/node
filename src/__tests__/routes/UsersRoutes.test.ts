import fastify from "fastify";
import userRoutes from "../../infra/web/routes/UserRoutes";
import { UserRepository } from "../../domain/repositories/UserRepository";
import redis from "../../infra/redis";
import UserRepositoryInMemory from "./repository/UserRepositoryInMemory";
import { User } from "../../domain/entities/User";

const app = fastify();
jest.mock("../../infra/redis", () => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0ODE5MzE1NSwiZXhwIjoxNzQ4MTk2NzU1fQ.IbLFvJRZsec9nM-uJ4Z4P7lbwy5Op0hYrVRHAq01afw'),
    quit: jest.fn().mockResolvedValue('OK'),
}));

const userRepositoryMock: UserRepository = new UserRepositoryInMemory();
const user: User = ({
    id: 34,
    name: "Bruno",
    email: "bruno@gmail.com",
    age: 28,
    birth_date: new Date('1997-02-28'),
    gender: "Male",
    password: "123"
});

describe("UserRoutes API test", () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = "mysecretkey";
        await app.register(userRoutes, { userRepository: userRepositoryMock })
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
        await redis.quit();
    });

    describe("GET /usuarios", () => {
        it("should list all users", async () => {
            const response = await userRepositoryMock.list();
            expect(response).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(user)
                ])
            );
        });

        it("Should find an user by id", async () => {
            const response = await userRepositoryMock.findById(34);
            expect(response).toEqual(
                expect.objectContaining(user)
            );
        });

        it("It should find an user by email", async () => {
            const response = await userRepositoryMock.findByEmail("bruno@gmail.com");
            expect(response).toEqual(
                expect.objectContaining(user)
            );
        });

        it("It should don't find an user by email", async () => {
            const response = await userRepositoryMock.findByEmail("noexistuser@gmail.com");
            expect(response).toBeNull();
        });

        it("It should delete a user by id", async () => {
            const response = await userRepositoryMock.delete(34);
            console.log(response);
            expect(response).toBeUndefined;
        });

        it("It should edit the name of the user by id", async () => {
            const response = await userRepositoryMock.edit(34, {
                id: 34,
                name: 'Bruno',
                email: 'alterado@gmail.com',
                age: 28,
                birth_date: new Date('1997-02-08'),
                gender: 'Male',
                password: '123'
            });
            expect(response).toEqual(
                expect.objectContaining({
                    id: 34,
                    name: 'Bruno',
                    email: 'alterado@gmail.com',
                    age: 28,
                    birth_date: new Date('1997-02-08'),
                    gender: 'Male',
                    password: '123'
                })
            );
        });
    })
});