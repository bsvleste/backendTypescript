import { Specification } from "@modules/cars/entities/Specification";
import { myDataSource } from "src/database/app-data-source";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {

  private specifications

  private static INSTANCE: SpecificationRepository;
  constructor() {
    this.specifications = myDataSource.getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void>{
    const specification = this.specifications.create({
      name,description
    });
    await this.specifications.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.specifications.find()
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOneBy(name);
    return specification;
  }
}
