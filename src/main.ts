import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.DailyRotateFile({
       // %DATE will be replaced by the current date
          filename: `logs/%DATE%-error.log`, 
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, // don't want to zip our logs
          maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // same for all levels
        // new transports.DailyRotateFile({
        //   filename: `logs/%DATE%-combined.log`,
        //   format: format.combine(format.timestamp(), format.json()),
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: false,
        //   maxFiles: '30d',
        // }),
        new transports.Console({
         format: format.combine(
           format.cli(),
           format.splat(),
           format.timestamp(),
           format.printf((info) => {
             return `${info.timestamp} ${info.level}: ${info.message}`;
           }),
          ),
      }),
      ],
    }),
  });
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
