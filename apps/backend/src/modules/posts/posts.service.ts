import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findByTopicId(topicId: number, page: number = 1, limit: number = 20) {
    const [posts, total] = await this.postsRepository.findAndCount({
      where: { topicId },
      order: { createdAt: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'],
    });

    return {
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'topic'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async create(postData: Partial<Post>) {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async update(id: number, content: string) {
    const post = await this.findOne(id);
    post.content = content;
    post.editedAt = new Date();
    post.editCount += 1;
    return this.postsRepository.save(post);
  }

  async delete(id: number) {
    await this.postsRepository.delete(id);
    return { message: 'Post deleted successfully' };
  }

  async incrementThanksCount(postId: number) {
    const post = await this.findOne(postId);
    post.thanksCount += 1;
    return this.postsRepository.save(post);
  }
}
