import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('video')
export class VideoConsumer {
  @Process('video-job')
  handleTransvideo(job: Job) {
    console.log('Start video compress into mp4...');
    console.log(job.data);
    console.log('completed!!');
  }
}
@Processor('text')
export class TextConsumer {
  @Process('text-job')
  handleTransvideo(job: Job) {
    console.log('Start text compress into mp4...');
    console.log(job.data);
    console.log('completed!!');
  }
}