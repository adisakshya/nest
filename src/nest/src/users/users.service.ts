import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from '../database/entity/user.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>,
    ) {}
  
    create(createUserDto: CreateUserDto): Promise<User> {
      const user = new User();
      user.id = uuidv4();
      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return this.usersRepository.save(user);
    }
  
    async findAll(): Promise<User[]> {
      return this.usersRepository.find();
    }
  
    findOne(id: string): Promise<User> {
      return this.usersRepository.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
      await this.usersRepository.delete(id);
    }
}