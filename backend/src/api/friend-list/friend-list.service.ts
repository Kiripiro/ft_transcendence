import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendListEntity } from './friend-list.entity';

@Injectable()
export class FriendListService {
	constructor (
		@InjectRepository(FriendListEntity)
		private friendListRepository: Repository<FriendListEntity>,
	) {}

	findAll(): Promise<FriendListEntity[]> {
		return this.friendListRepository.find();
	}

	findOne(id: number): Promise<FriendListEntity> {
		return this.friendListRepository.findOneBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.friendListRepository.delete(id);
	}
}
