import "reflect-metadata";

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';
import {UsersRepositoryInMemory} from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@errors/AppError';

let authenticaseUserUseCase:AuthenticationUserUseCase
let usersRepositoryInMemory:UsersRepositoryInMemory
let createUserUseCase:CreateUserUseCase

describe("Authentication user",()=>{
    beforeEach(async ()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticaseUserUseCase = new AuthenticationUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    })

    it('should be able to authentication a user',async ()=>{
        const user:ICreateUserDTO={
            driver_license:"B",
            email:"user@test.com",
            name:"Test de Test",
            password:'Test123'
        }

        await createUserUseCase.execute(user);

        const result = await authenticaseUserUseCase.execute({
            email:user.email,
            password:user.password
        })

        expect(result).toHaveProperty("token")

    });
    it("should not be able an noexistent user",()=>{
        expect(async()=>{
            await authenticaseUserUseCase.execute({
                email:"false@gmail.com",
                password:"Test123"
            })
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to authentication with incorrect passqord",()=>{
        expect(async()=>{
            const user:ICreateUserDTO={
                name:"User Teste Error",
                email:"user@user.com",
                password:"123",
                driver_license:"A"

            }
            await createUserUseCase.execute(user);

            await authenticaseUserUseCase.execute({
                email:user.email,
                password:"erropassword"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
