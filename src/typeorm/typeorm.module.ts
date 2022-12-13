import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/Post';
import { Profile } from './entities/Profile';
import { User } from './entities/User';
import { UsersService } from './services/users/users.service';
import { UsersController } from './users/controllers/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class TypeormModule {}
