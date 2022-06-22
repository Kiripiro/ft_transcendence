import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
	  TypeOrmModule.forFeature([UserEntity]),
	 // PassportModule.register({ defaultStrategy: 'jwt' }),
	  JwtModule.register({
		  secret: `${process.env.JWT_SECRET}`,
		  signOptions: {
			  expiresIn: '7d',
		  },
	  }),
	  HttpModule,
	  UserModule,
	],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
