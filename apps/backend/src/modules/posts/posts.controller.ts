import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('topic/:topicId')
  async getPostsByTopic(
    @Param('topicId') topicId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.postsService.findByTopicId(topicId, page, limit);
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() postData: any) {
    return this.postsService.create({
      ...postData,
      userId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() postData: any) {
    return this.postsService.update(id, postData.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/thank')
  async thankPost(@Param('id') id: number) {
    return this.postsService.incrementThanksCount(id);
  }
}
