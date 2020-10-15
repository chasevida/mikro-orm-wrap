import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'


export type UserVM = {
  id: string,
  emails: Array<UserEmailVM>,
  name: string,
  status: string,
}

export type UserEmailVM = {
  id: string,
  email: string,
  userId: string,
  primary: boolean,
  status: string,
}


abstract class BaseEntity<T> {

  @PrimaryKey({ type: 'string' })
  id!: string

}

@Entity({ tableName: 'user_profile' })
export class User extends BaseEntity<UserVM> {

  @OneToMany({ entity:() => Email, mappedBy: 'user' })
  emails = new Collection<Email>(this)

  @Property({ type: 'string' })
  name!: string

  @Property({ type: 'string' })
  status!: string

}

@Entity({ tableName: 'user_email' })
export class Email extends BaseEntity<UserEmailVM> {

  @Property({ type: 'string' })
  @Index()
  email!: string

  @ManyToOne({ type: 'User' })
  @Index()
  user!: User

  @Property({ type: 'boolean' })
  primary!: boolean

  @Property({ type: 'string' })
  status!: string

}

export const EntityMap = [
  BaseEntity,
  User,
  Email,
]
