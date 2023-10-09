import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
