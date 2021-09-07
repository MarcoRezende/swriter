import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HintsModule } from './hints/hints.module';

@Module({
  imports: [HintsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
