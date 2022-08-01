import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { myDataSource } from "@shared/infra/typeorm/app-data-source";
import { Repository } from "typeorm";

export class SpecificationRepository implements ISpecificationRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = myDataSource.getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name, description
    });
    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }
}
