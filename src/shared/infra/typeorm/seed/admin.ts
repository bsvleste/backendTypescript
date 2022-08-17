import "reflect-metadata"
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt'
import { myDataSource } from '../app-data-source';
import { User } from '../../../../modules/accounts/infra/typeorm/entities/User';

async function create() {

    const id = uuidV4();
    const password = await hash('admin', 10);
    myDataSource.initialize().then(async() => {
      const user = new User();
      user.id = id,
        user.name = "admin",
        user.email="admin@admin.com.br",
        user.password = password,
        user.isAdmin=true,
        user.driver_license = "A",
        user.created_at = new Date(),
      await myDataSource.manager.save(user)
      console.log(`Connected user ${user.id}`)
      await myDataSource.close()
    }).catch((err) => {
      console.log(`Err connect: ${err.message}`)
    })

}

create().then(() => console.log('admin created successfully'))
