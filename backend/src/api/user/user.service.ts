import { Logger, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	private logger: Logger = new Logger('UserService');

	public getAllUsers(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}

	async getUserById(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOneBy( {id: id} );
		if (!user)
			return null;
		return user;
	}

	async getUserByLogin(login: string): Promise<UserEntity> {
		const user = await this.userRepository.findOneBy( {login: login} );
		if (!user)
			return null;
		return user;
	}

	async createUser(body: CreateUserDto): Promise<UserEntity> {
		const response = await this.userRepository.findOneBy( {login: body.login} );
		if (response)
			return null;

		const user: UserEntity = new UserEntity();

		user.nickname = body.login;
		user.login = body.login;

		return this.userRepository.save(user);
	}

	async updateRefreshToken(body: UpdateUserDto, refreshToken: any) {
		const user = await this.getUserById(body.sub);
		if (user) {
			user.refreshToken = refreshToken;
			user.refreshTokenIAT = body.iat;
			user.refreshTokenExp = body.exp;
			this.userRepository.save(user);
			return user;
		}
		return null;
	}
}
