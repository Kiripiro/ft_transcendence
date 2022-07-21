import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) {}

	@Get('/login')
		async login(@Query() query, @Res({ passthrough: true }) res: Response) {
		const accessToken = await this.authService.login(query);

		console.log(accessToken);

		const refreshToken = await this.authService.createRefreshToken(accessToken);
		console.log(refreshToken);
		const secretData = {
			accessToken,
			refreshToken
		};
		console.log('login: ', secretData);


		res.cookie('auth-cookie', secretData, {httpOnly: false});
		//GESTION D ERREUR NECESSAIRE
		res.status(302).redirect(`http://10.4.1.7:3000/HomePage`);
	}
	//logout

	@Get('/refresh')
	@UseGuards(AuthGuard('jwt'))
	async refresh(@Query() query, @Res({ passthrough: true }) res: Response) {
		console.log('refresh');
		//await this.authService.createRefreshToken(query);
	}

}
