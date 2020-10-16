import * as dotenv from 'dotenv'
import { wrap, MikroORM } from '@mikro-orm/core'
import { EntityMap, User, UserVM } from './model.entities'


dotenv.config({ path: '.env' })

const main = async () => {

  console.log('[Running test application]')

  const orm = await MikroORM.init({
    entities: EntityMap,
    type: 'mariadb',
    host : process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    debug: Boolean(process.env.DATABASE_DEBUG),
  })

  const createUser = async (userParams: Partial<UserVM>) => {
    const user = new User()
    wrap(user).assign(userParams, {
      em: orm.em,
      mergeObjects: true,
    })
    console.log('[created user]', JSON.stringify(user, null, 2))
    await orm.em.persistAndFlush([user])
  }

  const updateUser = async ({ id, ...userParams }: Partial<UserVM>) => {
    const user = await orm.em.findOne(User, { id }, ['emails'])
    // Expecting child collection to be updated also
    wrap(user).assign(userParams, {
      em: orm.em,
      mergeObjects: true,
    })
    console.log('[updated user]', JSON.stringify(user, null, 2))
    await orm.em.persistAndFlush([user])
  }

  const findOneUser = async (id: string) => {
    const user = await orm.em.findOne(User, { id }, ['emails'])
    console.log('[found user]', JSON.stringify(user, null, 2))
  }

  const mockUserId = 'u123456789'

  const mockUserInput: UserVM = {
    id: mockUserId,
    name: 'Mark',
    status: 'pending', // Initialized as 'pending'
    emails: [{
      id: 'e987654321',
      email: 'mark@email.com',
      userId: mockUserId,
      primary: false, // Initialized as false
      status: 'pending', // Initialized as 'pending'
    }],
  }

  await createUser(mockUserInput)

  const mockUserUpdates: Partial<UserVM> = {
    id: mockUserId,
    status: 'verified', // Changed to 'verified
    emails: [{
      id: 'e987654321',
      email: 'mark@email.com',
      userId: mockUserId,
      primary: true, // Changed to true
      status: 'verified', // Changed to 'verified
    }]
  }

  await updateUser(mockUserUpdates)

  findOneUser(mockUserId)

}

main()
