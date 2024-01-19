import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue')
export class QueueController {
  constructor(
    @InjectQueue('video') private readonly videoQueue: Queue,
    @InjectQueue('dynamic') private readonly dynamicQueue: Queue,
  ) {}

  @Post('video')
  async video() {
    await this.videoQueue.add('video-job', {
      file: 'video.mp4',
    });
  }
  @Post('dynamic')
  async dynamic() {
      const tasks = ['Taks1','Taks2','Taks3','Taks4','Taks5','Taks6'];
      const batchSize = 2;

      async function queueBatch(files: string[], dynamicQueue: Queue) {
          const queuePromises = files.map( (file) => {
              return dynamicQueue.add('dynamic-job', { file });
          });
          await Promise.all(queuePromises);
      }
      for (let i = 0; i < tasks.length; i += batchSize) {
          const batch = tasks.slice(i, i + batchSize);
          await queueBatch(batch, this.dynamicQueue);
      }
  }
}