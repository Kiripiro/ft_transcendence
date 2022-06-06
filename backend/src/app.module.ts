import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
	  TypeOrmModule.forRoot({
		  type: 'postgres',
		  host: process.env.DB_HOST,
		  username: process.env.DB_USER,
		  password: process.env.DB_PASSWORD,
		  database: process.env.DB_DATABASE,
		  entities: [],
		  synchronize: true,
	  })
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],

})
export class AppModule {}
