import { User } from "../entities/User";
import { UserRepository } from "../repositories";


type UserRequest = {
 name: string
}

export class ShowUserService {


 async findAll(): Promise<Error | User | User[]> {

  const userRepository = UserRepository();

  const findUser = await userRepository.find({
   order: {
    name: "ASC"
   }
  });

  return findUser;

 }


 async findByName({ name }: UserRequest): Promise<Error | User> {

  const userRepository = UserRepository();

  const findUser = await userRepository.findOne({ name });

  if (!findUser) return new Error('User not found');

  delete findUser.password;

  return findUser;

 }


}