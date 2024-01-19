import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue/file')
export class QueueController {
  constructor(
    @InjectQueue('video') private readonly videoQueue: Queue,
    @InjectQueue('text') private readonly textQueue: Queue,
  ) {}

  @Post()
  async transcode() {
    await this.videoQueue.add('video-job', {
      file: 'video.mp4',
    });
    await this.textQueue.add('text-job', {
      file: 'text.txt',
    });
  }
}