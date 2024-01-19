import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueController } from './controllers/queue.controller';
import { DynamicConsumer, VideoConsumer } from './processor/queue.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'video',
      },
      {
        name: 'dynamic',
      }
    ),
  ],
  controllers: [QueueController],
  providers: [
    VideoConsumer,
    DynamicConsumer,
  ],
})
export class QueueModule {}