import { Specification } from "../models/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository{
  private specifications:Specification[];
  constructor(){
    this.specifications=[];
  }
  findByName(name: string): Specification {
    const specification = this.specifications.find(specification=>specification.name === name)
    return specification
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification,{
      name,
      description,
      create_at:new Date()
    })
      this.specifications.push(specification)
  }
  list():Specification[] {
    return this.specifications;
  }

}
