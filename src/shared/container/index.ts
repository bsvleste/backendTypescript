import { container } from 'tsyringe'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRespository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepositoris';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

container.registerSingleton<ICategoriesRepository>(
  "CategoryRepository",
  CategoryRepository
)
container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
)
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)
