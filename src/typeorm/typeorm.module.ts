import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Hero } from './entities/Hero';
import { Movie } from './entities/Movie';
import { Post } from './entities/Post';
import { Profile } from './entities/Profile';
import { User } from './entities/User';
import { UsersService } from './services/users/users.service';
import { UsersController } from './users/controllers/users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Post, Hero, Movie]),
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
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class TypeormModule {}
