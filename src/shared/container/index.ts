import {container} from 'tsyringe'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoryRepository } from './../../modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { IUsersRepository } from './../../modules/accounts/repositories/IUsersRespository';
import { UsersRepository } from './../../modules/accounts/repositories/implementations/UsersRepositoris';

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
