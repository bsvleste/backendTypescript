import {container} from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DaysDateProvider } from './DateProvider/implementations/DaysDateProvider';

container.registerSingleton<IDateProvider>(
  "DaysDateProvider",
  DaysDateProvider
)
