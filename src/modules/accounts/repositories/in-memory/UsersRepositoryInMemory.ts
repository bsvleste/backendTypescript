import { IUsersRepository } from '../IUsersRespository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
export class UsersRepositoryInMemory implements IUsersRepository{
   users:User[] = []
   
    async create({driver_license,name,email,password}: ICreateUserDTO): Promise<void> {

        const user = new User();

        Object.assign(user,{
            name,
            email,
            password,
            driver_license
        })
        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user=>user.email === user.email)

    }
    async findById(id: string): Promise<User> {
        return this.users.find(user=>user.id === id)
    }

}