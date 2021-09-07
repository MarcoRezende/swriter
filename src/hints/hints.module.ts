import { Module } from '@nestjs/common';
import { HintsService } from './hints.service';
import { HintsController } from './hints.controller';

@Module({
  controllers: [HintsController],
  providers: [HintsService],
})
export class HintsModule {}
