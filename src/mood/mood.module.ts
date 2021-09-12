import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from './entities/mood.entity';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
