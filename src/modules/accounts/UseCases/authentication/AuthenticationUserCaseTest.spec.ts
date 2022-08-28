import "reflect-metadata";

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';

let authenticateUserUseCase: AuthenticationUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authentication user", () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticationUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    })

    it('should be able to authentication a user', async () => {
        const user: ICreateUserDTO = {
            driver_license: "B",
            email: "user@test.com",
            name: "Test de Test",
            password: 'Test123'
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")

    });
    it("should not be able an no existent user", async () => {
        await expect(authenticateUserUseCase.execute({
            email: "false@gmail.com",
            password: "Test123"
        })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    });

    it("should not be able to authentication with incorrect password", async () => {

        const user: ICreateUserDTO = {
            name: "User Tests Error",
            email: "user@user.com",
            password: "123",
            driver_license: "A"

        }
        await createUserUseCase.execute(user);
        await expect(
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "err password"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})
