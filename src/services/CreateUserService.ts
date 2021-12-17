import { User } from '../entities/User';
import { UserRepository } from '../repositories';
import { hash } from 'bcryptjs';

type UserRequest = {
 name: string;
 email: string;
 acronym: string;
 password: string;
}

export class CreateUserService {
 async execute({ name, email, acronym, password }: UserRequest): Promise<Error | User> {

  const existUserEmail = await UserRepository().findOne({ email });
  if (existUserEmail) return new Error('E-mail already exists');

  const existsUserAcronym = await UserRepository().findOne({ acronym });
  if (existsUserAcronym) return new Error('Acronym already exists');

  const passwordHash = await hash(password, 8);

  const user = UserRepository().create({ name, email, acronym, password: passwordHash });
  await UserRepository().save(user);

  delete user.password;
  delete user.updated_at;
  
  return user;
 }
}