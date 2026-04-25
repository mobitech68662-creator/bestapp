import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forum } from './entities/forum.entity';

@Injectable()
export class ForumsService {
  constructor(
    @InjectRepository(Forum)
    private forumsRepository: Repository<Forum>,
  ) {}

  async findAll() {
    return this.forumsRepository.find({
      order: { order: 'ASC', createdAt: 'ASC' },
      relations: ['children'],
      where: { parentId: null },
    });
  }

  async findOne(id: number) {
    return this.forumsRepository.findOne({
      where: { id },
      relations: ['children', 'topics'],
    });
  }

  async create(forumData: Partial<Forum>) {
    const forum = this.forumsRepository.create(forumData);
    return this.forumsRepository.save(forum);
  }
}
