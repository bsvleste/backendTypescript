import { app } from '@shared/infra/http/app';
import  request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { myDataSource } from '../../../../shared/infra/typeorm/app-data-source';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

describe("Create Category controller",()=>{
  beforeAll(async ()=>{
    const id = uuidV4();
    const password = await hash('admin', 10);
    await myDataSource.initialize().then(async() => {
      await myDataSource.runMigrations();
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

    }).catch((err) => {
      console.log(`Err connect: ${err.message}`)
    })
  })

  afterAll(async()=>{
    await myDataSource.dropDatabase();
    await myDataSource.close();
  })
  it("should be able to create a new category ",async()=>{

    const responseToken = await request(app).post("/sessions")
    .send({
      email:'admin@admin.com.br',
      password:'admin',
      isAdmin:true,
    })
    const {token} = responseToken.body;
    const response = await request(app)
    .post('/categories')
    .send(
      {
      name: "SuperTest Category",
      description: "This is a super test.",
    }).set({
      Authorization:`Bearer ${token}`
    })
    expect(response.status).toBe(201);
  })

})
