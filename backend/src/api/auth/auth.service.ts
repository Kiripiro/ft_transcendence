import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { Query } from 'typeorm/driver/Query';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userServices: UserService,
		private http: HttpService,
		private jwtService: JwtService
	  ) {}

	private readonly clientId: string = process.env.API_UID;
	private readonly clientSecret: string = process.env.API_SECRET;
	private readonly API_authorizationURI=process.env.API_authorizationURI;
	private readonly redirectURI=process.env.API_redirectURI;
	private readonly endpoint=process.env.API_endpoint;
	private accessToken: string;
	private headers: { Authorization: string };
	private logger: Logger = new Logger('AuthService');

	/*
	*	@query - contient la variable 'code' reçue via la méthode GET permettant d'identifier l'utilisateur qui s'est connecté
	*	@token - contient le retour de la requête en méthode POST, afin de récupérer "l'acccess_token"
	*	@access_token - token permettant d'effectuer des requêtes sur l'API 42
	*	@data - contient le resultat de la requête permettant d'obtenir un profil Intra 42
	*
	*	Récupère les informations de l'utilisateur venant de se log avec l'Intra 42 et créer un profil s'il n'existe pas.
	*/
	async login(query) {
		try {
			const token = this.http.post(`${this.API_authorizationURI}`,
			`grant_type=authorization_code&client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${query.code}&redirect_uri=${this.redirectURI}`);

			this.accessToken = (await lastValueFrom(token)).data.access_token;
			this.headers = { Authorization: `Bearer ${this.accessToken}` };

			const { data } = await lastValueFrom(
				this.http.get(`${this.endpoint}/me`, {
				  headers: this.headers,
				}),
			);
			console.log("login: ", data.login);

			let user = await this.userServices.getUserByLogin(data.login);

			if (!user) {
				user = await this.userServices.createUser(data);
				//CREER TOKEN JWT
				console.log('User', data.login, 'created.');
			}
			return this.signUser(user);
		} catch(error) {
			this.logger.error(error);
		}
	}

	signUser(user: UserEntity) {
		return this.jwtService.sign({
			user_id: user.id,
			user_login: user.login,
		});
	}
}
