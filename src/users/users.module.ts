import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middlewares/another/another.middleware';
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
    // consumer.apply(ExampleMiddleware).forRoutes('users');

    // we can call it with the controller as well
    // consumer.apply(ExampleMiddleware).forRoutes(UsersController);

    // we can define it for the specific routes like below
    // we can also chain multiple middleware like below with multiple apply method
    consumer.apply(ExampleMiddleware)
    .forRoutes(
    {
      path: 'users',
      method: RequestMethod.GET,
    },
    {
      path: 'users/:id',
      method: RequestMethod.GET,
    },
    )
    .apply(AnotherMiddleware)
    .forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
      );
  }
}
