import { Module } from '@nestjs/common';
import { VideoGateway } from './video/video.gateway';
import { DocModule } from './doc/doc.module';

@Module({
  providers: [VideoGateway],
  imports: [DocModule],
})
export class AppModule {}
