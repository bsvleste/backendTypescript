import { Specification } from "@modules/cars/entities/Specification";
import { myDataSource } from "src/database/app-data-source";
import { Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {

  private repository : Repository<Specification>

  private static INSTANCE: SpecificationRepository;
  constructor() {
    this.repository = myDataSource.getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void>{
    const specification = this.repository.create({
      name,description
    });
    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const repository = await this.repository.find()
    return repository;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({name});
    return specification;
  }
}
