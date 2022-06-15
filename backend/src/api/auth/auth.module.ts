import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
	  TypeOrmModule.forFeature([UserEntity]),
	  HttpModule,
	  UserModule,
	],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
