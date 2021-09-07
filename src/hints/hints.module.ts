import { Module } from '@nestjs/common';
import { HintsService } from './hints.service';
import { HintsController } from './hints.controller';
import { Hint } from './entities/hint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hint])],
  controllers: [HintsController],
  providers: [HintsService],
})
export class HintsModule {}
