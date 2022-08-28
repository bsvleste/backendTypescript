import { container } from 'tsyringe'
import "@shared/container/providers"
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRespository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepositoy';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rental/infra/typeorm/repositories/RentalsRepository';
import { UserRefreshTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UserRefreshTokenRepository';
import { IUsersRefreshTokenRepository } from '@modules/accounts/repositories/IUsersRefresTokenRepository';

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
container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
)
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)
container.registerSingleton<IUsersRefreshTokenRepository>(
  "UserRefreshTokenRepository",
  UserRefreshTokenRepository
)

