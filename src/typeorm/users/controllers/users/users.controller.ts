import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { CreateUserDto } from 'src/typeorm/dtos/CreateUser.dto';
import { CreateUserHeroDto } from 'src/typeorm/dtos/CreateUserHero.dto';
import { CreateUserMovieDto } from 'src/typeorm/dtos/CreateUserMovie.dto';
import { CreateUserPostDto } from 'src/typeorm/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/typeorm/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/typeorm/dtos/UpdateUser.dto';
import { UsersService } from 'src/typeorm/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userServce: UsersService) {}

  @Get()
  getUsers() {
    return this.userServce.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.userServce.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userServce.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userServce.deleteUser(id);
  }

  @Post('profiles/:id')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userServce.createUserProfile(id, createUserProfileDto);
  }

  @Post('posts/:id')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userServce.createUserPost(id, createUserPostDto);
  }

  @Post('heroes')
  createUserHero(@Body() createUserHeroDto: CreateUserHeroDto) {
    return this.userServce.createUserHero(createUserHeroDto);
  }
  @Post('movies/:heroIds')
  createUserMovie(
    @Param('heroIds', ParseArrayPipe) heroIds: Array<number>,
    @Body() createUserMovieDto: CreateUserMovieDto,
  ) {
    return this.userServce.createUserMovie(heroIds, createUserMovieDto);
  }
}
