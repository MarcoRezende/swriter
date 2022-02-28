import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvParserService } from '@services/csv-parser';

import { Hint } from './entities/hint.entity';
import { HintsAdminController } from './hints.admin.controller';
import { HintsAppController } from './hints.app.controller';
import { HintsService } from './hints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hint]), CsvParserService],
  controllers: [HintsAppController, HintsAdminController],
  providers: [HintsService, CsvParserService],
})
export class HintsModule {}
