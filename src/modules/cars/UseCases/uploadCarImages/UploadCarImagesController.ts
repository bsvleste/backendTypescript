import { Request,Response } from "express";
import { container } from 'tsyringe';
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles{
  filename:string
}

export class UploadCarImagesController{

  async handle(req:Request,res:Response):Promise<Response>{

    const {id} = req.params;
    const images = req.files as unknown as IFiles[];
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)
    const images_name = images.map((file)=> file.filename)

    console.log(images)
    await uploadCarImagesUseCase.execute({
      car_id:id,
      images_name
    })
    return res.status(201).send();
  }
}
