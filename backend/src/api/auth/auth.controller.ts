import { Controller, Get, Query, Redirect, Res, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserController } from '../user/user.controller';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('/login')
	@Redirect('http://localhost:3000/HomePage')
	async login(@Query() query, @Res() response: Response) {
		const user = await this.authService.login(query);
		console.log(user);
		return user;
	}

	//logout
}
