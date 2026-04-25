import { Controller, Get, Param } from '@nestjs/common';
import { ForumsService } from './forums.service';

@Controller('forums')
export class ForumsController {
  constructor(private forumsService: ForumsService) {}

  @Get()
  async getAllForums() {
    return this.forumsService.findAll();
  }

  @Get(':id')
  async getForumById(@Param('id') id: number) {
    return this.forumsService.findOne(id);
  }
}
