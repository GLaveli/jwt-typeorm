import { compare } from "bcryptjs";
import { UserRepository } from "../repositories";
import { sign } from 'jsonwebtoken';

type UserRequest = {
 email: string,
 password: string
}

export class SessionService {
 async execute({ email, password }: UserRequest) {

  const userRepository = UserRepository();

  const user = await userRepository.findOne({ email });

  if (!user) return new Error('User does not exists');

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) return new Error('user or password incorrect');

  delete user.password;
  delete user.created_at;
  delete user.updated_at;

  const token = sign({}, process.env.SECRET_JWT, {
   subject: user.id,
   expiresIn: '1d'
  });

  return { user, token };

 }
}