import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueController } from './controllers/queue.controller';
import { TextConsumer, VideoConsumer } from './processor/queue.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'video',
      },
      {
        name: 'text',
      }
    ),
  ],
  controllers: [QueueController],
  providers: [
    VideoConsumer,
    TextConsumer,
  ],
})
export class QueueModule {}