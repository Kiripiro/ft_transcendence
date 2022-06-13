import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}

	public getAllUsers(): Promise<UserEntity[]> {
		return this.userRepository.find();
	}

	async getUser(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOneBy( {id: id} );
		if (!user) {
			console.log('Didn\'t find user !');
			return null;
		}
		console.log('Found user !');
		return user;
	}

	async createUser(body: CreateUserDto): Promise<UserEntity> {
		console.log('oui');
		const user: UserEntity = new UserEntity();

		user.nickname = body.nickname;
		user.login = body.login;

		return this.userRepository.save(user);
	}
}
