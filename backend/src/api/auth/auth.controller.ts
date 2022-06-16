import { Param, Controller, Get, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { get } from 'http';
import { Auth42DTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('/api42/signin')
	async signIn42(@Query() query) {
		return await this.authService.signIn42(query);
	}

/*	@Get('/api42/signin')
	async getCode(@Query() query): Promise<string> {
		console.log('here');
		return this.authService.getCode(query);
	}*/
}
