import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumsController } from './forums.controller';
import { ForumsService } from './forums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Forum])],
  controllers: [ForumsController],
  providers: [ForumsService],
  exports: [ForumsService],
})
export class ForumsModule {}
