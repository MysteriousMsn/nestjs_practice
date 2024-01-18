import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseArrayPipe,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Render,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  async getUsers() {
    return await this.userServce.findUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ) {
    //password field will not be available in the reponse due to exclude decorator in the schema
    // and UserInterpretors decorator
    return await this.userServce.findUser(id);
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
  @Get('movies/get')
  getMovies() {
    return this.userServce.findMovies();
  }
  @Get('heroes/get')
  getHeroes() {
    return this.userServce.findHeroes();
  }
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000 * 1000 }), // max side is set to 1 mb
        new FileTypeValidator({ fileType: 'image/png' }),
      ],
    }),
  ) file: Express.Multer.File) {
    console.log(file);
  }
  @Get('render/page')
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
