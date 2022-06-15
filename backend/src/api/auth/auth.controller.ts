import { Controller, Post, Query } from '@nestjs/common';
import { Auth42DTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/api42/signin')
	async signIn42(@Query() auth42Dto: Auth42DTO) {
		return await this.authService.signIn42(auth42Dto);
	}
}
