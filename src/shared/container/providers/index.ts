import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DaysDateProvider } from './DateProvider/implementations/DaysDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
  "DaysDateProvider",
  DaysDateProvider
)
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)
