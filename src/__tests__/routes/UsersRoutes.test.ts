import fastify from "fastify";
import userRoutes from "../../infra/web/routes/UserRoutes";
import { UserRepository } from "../../domain/repositories/UserRepository";
import redis from "../../infra/redis";

const app = fastify();

const userRepositoryMock: UserRepository = {
    create: jest.fn(),
    list: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn()
}

describe("UserRoutes API test", () => {
    beforeAll(async ()=>{
        process.env.JWT_SECRET = "mysecretkey";
        // await app.register(userRoutes, { userRepository: userRepositoryMock })
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
        await redis.quit();
    })

    describe("GET /usuarios", ()=>{
        it("should list all users", async () => {
            
        })
    })
});