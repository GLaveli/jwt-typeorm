import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const UserRepository = () => {
 return getRepository(User);
};