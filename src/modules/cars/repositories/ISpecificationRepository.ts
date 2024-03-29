import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpecificationDTO {
  name: string,
  description: string
}

export interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  findByIds(ids:string[]):Promise<Specification[]>
}
