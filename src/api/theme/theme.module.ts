import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Theme } from './entities/theme.entity';
import { ThemeAdminController } from './theme.admin.controller';
import { ThemeAppController } from './theme.app.controller';
import { ThemeService } from './theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemeAppController, ThemeAdminController],
  providers: [ThemeService],
})
export class ThemeModule {}
