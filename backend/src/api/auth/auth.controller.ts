import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('/api42/signin')
	async signIn42(@Query() query) {
		return await this.authService.signIn42(query);
	}
}
