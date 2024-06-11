import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 async create(createUserDto: CreateUserDto): Promise<User> {
    this.validateRequiredFields(createUserDto, ['name', 'userName' , 'email', 'password']);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  private validateRequiredFields(dto: any, requiredFields: string[]) {
    const missingFields = requiredFields.filter(field => !dto[field]);

    if (missingFields.length > 0) {
      throw new BadRequestException({
        status: 'error',
        message: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`,
      });
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
