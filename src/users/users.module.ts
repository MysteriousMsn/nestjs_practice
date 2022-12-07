import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
// we can register middleware like below
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // the example middleware will work on all users routes
    consumer.apply(ExampleMiddleware).forRoutes('users');
  }
}
