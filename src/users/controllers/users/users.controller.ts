import {
  Controller
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // We can define routes with Get and Post method like below
  // users is the first segment of the route and next can be defined by passing into @Get and @Post decorators like below

  // this is a get method which prints query parameters
  // @Get('')
  // getUsers(@Query('sortBy') sortBy: string, @Query('pagination', ParseBoolPipe) pagination: boolean){
  //     console.log({sortBy, pagination});
  //   return [{username: 'Mohsin', email: 'mohsinsunasara60@gmail.com', sortBy, pagination}];
  // }

  // we can call data from services like below
  // @Get()
  // getUsers() {
  //   return this.userService.fetchUsers();
  // }

  // @Get('posts')
  // getUsersPosts() {
  //   return [
  //     {
  //       username: 'Mohsin',
  //       email: 'mohsinsunasara60@gmail.com',
  //       posts: {
  //         id: 1,
  //         title: 'Post 1',
  //       },
  //     },
  //   ];
  // }

  // @Get('posts/comments')
  // getUsersPostsComments() {
  //   return [
  //     {
  //       id: 1,
  //       title: 'Post 1',
  //       comments: [],
  //     },
  //   ];
  // }

  // @Post('create')
  // createUser(@Req() request: Request, @Res() response: Response){
  //  console.log(request.body);
  //  response.send('Created');
  // }

  // we can create a dto like below instead of request object
  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // createUser(@Body() userData: CreateUserDto){

  //  return userData;
  // }

  // we can post the data with the help of services like below
  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // createUser(@Body() userData: CreateUserDto) {
  //   return this.userService.createUser(userData);
  // }

  // below example to get data by param
  // @Get(':id')
  // getUserById(@Req() request: Request, @Res() response: Response){
  //  console.log(request.params);
  //  response.send(request.params);
  // }

  // below is the next js way to get params
  // @Get(':id/:postId')
  // getUserById(@Param('id') id: string, @Param('postId') postId: string){
  //  console.log({id, postId});
  //  return {id,postId };
  // }

  // ParseIntPipe will parse id into integer value
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number){
  //  console.log({id});
  //  return {id };
  // }

  //get user by id from services
  // @Get(':id')
  // getUserById(@Param('id', ParseIntPipe) id: number) {
  //   const user = this.userService.fetchUserById(id);
  //   if (!user)
  //     throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

  //   return user;
  // }
}
