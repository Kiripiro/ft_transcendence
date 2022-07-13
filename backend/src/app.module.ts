import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ ScheduleModule.forRoot() ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
