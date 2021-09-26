import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './config/config.schema';
import { HintsModule } from './hints/hints.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    HintsModule,
    CategoryModule,
    ThemeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
