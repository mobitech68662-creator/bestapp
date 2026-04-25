import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [users, total] = await this.usersRepository.findAndCount({
      select: ['id', 'username', 'avatar', 'postCount', 'wrzBalance', 'group', 'createdAt'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['topics', 'posts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'avatar', 'signature', 'bio', 'postCount', 'wrzBalance', 'group', 'createdAt'],
    });
  }

  async updateProfile(userId: number, profileData: Partial<User>) {
    await this.usersRepository.update(userId, profileData);
    return this.findOne(userId);
  }

  async updateWrzBalance(userId: number, amount: number) {
    const user = await this.findOne(userId);
    user.wrzBalance = parseFloat((user.wrzBalance + amount).toFixed(2));
    return this.usersRepository.save(user);
  }
}
