import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRespository';
import {deleteFile }from '../../../../utils/file'

interface IRequest{
    userId:string
    avatarFile:string
}
@injectable()
export class UpdateUserAvatarUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepositry:IUsersRepository
    ){}

    async execute({userId,avatarFile}:IRequest):Promise<void>{
        const user = await this.usersRepositry.findById(userId);
        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`)
        }
        user.avatar = avatarFile;

        await this.usersRepositry.create(user);
    }
}
