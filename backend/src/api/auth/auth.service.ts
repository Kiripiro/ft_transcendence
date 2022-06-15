import { Injectable } from '@nestjs/common';
import { Auth42DTO } from './auth.dto';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { RepositoryNotTreeError } from 'typeorm';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(
		private http: HttpService,
	  ) {}

	private readonly clientId: string = process.env.API_UID;
	private readonly clientSecret: string = process.env.API_SECRET;
	private readonly API_authorizationURI=process.env.API_authorizationURI;
	private readonly redirectURI=process.env.API_redirectURI;
	private accessToken: string;

	async signIn42(Auth42DTO: Auth42DTO) {
		console.log(Auth42DTO['code']);
		return this.http.post(`${this.API_authorizationURI}?grant_type=authorization_code&client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${Auth42DTO.code}&redirect_uri=${this.redirectURI}`,
		);
	}
}
