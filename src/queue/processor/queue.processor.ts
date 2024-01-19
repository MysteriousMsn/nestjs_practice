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
@Processor('dynamic')
export class DynamicConsumer {
  @Process('dynamic-job')
  handleDynamic(job: Job) {
    console.log('dynamic task queue processing started...');
    console.log(job.data);
    console.log('completed!!');
  }
}