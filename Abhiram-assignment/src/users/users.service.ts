import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(createDto: CreateUserDto): Promise<Partial<User>> {
    const existing = await this.usersRepo.findOne({ where: { email: createDto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const hashed = await bcrypt.hash(createDto.password, 10);
    const user = this.usersRepo.create({ ...createDto, password: hashed });
    const saved = await this.usersRepo.save(user);
    const { password, ...rest } = saved;
    return rest;
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.usersRepo.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<Partial<User>> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (updateDto.password) {
      updateDto.password = await bcrypt.hash(updateDto.password, 10);
    }
    Object.assign(user, updateDto);
    const saved = await this.usersRepo.save(user);
    const { password, ...rest } = saved;
    return rest;
  }

  async remove(id: string): Promise<void> {
    const res = await this.usersRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('User not found');
  }
}
