import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvParserService } from '../csv-parser/csv-parse.service';

import { Hint } from './entities/hint.entity';
import { HintsController } from './hints.controller';
import { HintsService } from './hints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hint]), CsvParserService],
  controllers: [HintsController],
  providers: [HintsService, CsvParserService],
})
export class HintsModule {}
