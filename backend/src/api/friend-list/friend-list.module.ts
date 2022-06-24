import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FriendListEntity} from './friend-list.entity';
import { FriendListService } from './friend-list.service';

@Module({
	imports: [TypeOrmModule.forFeature([FriendListEntity])],
	providers: [FriendListService],
	exports: [FriendListService]
})

export class FriendListModule {}
