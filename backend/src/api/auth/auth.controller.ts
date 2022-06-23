import { Controller, Get, Query, Redirect, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('/login')
	@Redirect('http://localhost:3000/HomePage')
	async login(@Query() query, @Res({ passthrough: true }) res: Response) {
		const accessToken = await this.authService.login(query);
		console.log(accessToken);
		const secretData = {
			accessToken,
			refreshToken: '',
		  };

		res.cookie('auth-cookie', secretData, {httpOnly: true});
		return {msg:'succes'};
	}
	//logout
}
