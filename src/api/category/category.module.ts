import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryAdminController } from './category.admin.controller';
import { CategoryAppController } from './category.app.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryAdminController, CategoryAppController],
})
export class CategoryModule {}
