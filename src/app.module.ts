import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { QueueModule } from './queue/queue.module';
import { Hero } from './typeorm/entities/Hero';
import { Movie } from './typeorm/entities/Movie';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { TypeormModule } from './typeorm/typeorm.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    QueueModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_mysql_tutorial',
      entities: [User, Profile, Post, Hero, Movie],
      synchronize: true,
    }),
    TypeormModule,
    CacheModule.register({
      isGlobal: true
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './upload', // Set your destination folder
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const originalName = file.originalname;
            const fileExtension = originalName.split('.').pop(); // Get the file extension
            const newFilename = `${uniqueSuffix}.${fileExtension}`;
            cb(null, newFilename);
          },
        }),
      }),
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
