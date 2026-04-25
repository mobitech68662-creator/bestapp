import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Get('forum/:forumId')
  async getTopicsByForum(
    @Param('forumId') forumId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.topicsService.findByForumId(forumId, page, limit);
  }

  @Get(':id')
  async getTopicById(@Param('id') id: number) {
    return this.topicsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTopic(@Request() req, @Body() topicData: any) {
    return this.topicsService.create({
      ...topicData,
      userId: req.user.id,
    });
  }
}
