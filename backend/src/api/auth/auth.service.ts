import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private http: HttpService,
	  ) {}

	private readonly clientId: string = process.env.API_UID;
	private readonly clientSecret: string = process.env.API_SECRET;
	private readonly API_authorizationURI=process.env.API_authorizationURI;
	private readonly redirectURI=process.env.API_redirectURI;
	private readonly endpoint: string = process.env.ENDPOINT;
	private accessToken: string;
	private headers: { Authorization: string };

	async signIn42(query) {
		const token = this.http.post(`${this.API_authorizationURI}`,
		`grant_type=authorization_code&client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${query.code}&redirect_uri=${this.redirectURI}`);

		this.accessToken = (await lastValueFrom(token)).data.access_token;
		console.log(this.accessToken);
		this.headers = { Authorization: `Bearer ${this.accessToken}` };

		const { data } = await lastValueFrom(
			this.http.get('https://api.intra.42.fr/v2/me', {
			  headers: { Authorization: `Bearer ${this.accessToken}` },
			}),
		  );
		console.log(data.login);
	}

	async getCode(code: string): Promise<string> {
		return code;
	}
}
