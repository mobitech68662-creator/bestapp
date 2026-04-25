import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic, TopicType } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
  ) {}

  async findByForumId(forumId: number, page: number = 1, limit: number = 20) {
    const [topics, total] = await this.topicsRepository.findAndCount({
      where: { forumId },
      order: { type: 'DESC', createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'forum'],
    });

    return {
      topics,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const topic = await this.topicsRepository.findOne({
      where: { id },
      relations: ['user', 'forum', 'posts'],
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    // Increment view count
    topic.viewCount += 1;
    await this.topicsRepository.save(topic);

    return topic;
  }

  async create(topicData: Partial<Topic>) {
    const topic = this.topicsRepository.create(topicData);
    return this.topicsRepository.save(topic);
  }

  async update(id: number, updateData: Partial<Topic>) {
    await this.topicsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.topicsRepository.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
