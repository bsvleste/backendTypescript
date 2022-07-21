import { Response,Request, NextFunction } from 'express';
import {verify} from'jsonwebtoken'
import { UsersRepository } from './../modules/accounts/repositories/implementations/UsersRepositoris';

interface IPlayload{
  sub:string
}

export async function ensureAutehnticated(req:Request,res:Response,next:NextFunction){

  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing");
  }

  const[,token] = authHeader.split(" ");
  try{
    const {sub:user_id} = verify(token,"aad36f93de62af67da06c264e0715ead0a20326e") as IPlayload
    const userRepository = new UsersRepository()
    const user = userRepository.findById(user_id)

    if(!user){
      throw new Error("User not find")
    }
    next();
  }catch{
    throw new Error(`Invalid token`)
  }

  return
}
