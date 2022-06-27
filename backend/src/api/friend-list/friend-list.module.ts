import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { FriendListController } from './friend-list.controller';
import {FriendListEntity} from './friend-list.entity';
import { FriendListService } from './friend-list.service';

@Module({
	imports: [TypeOrmModule.forFeature([FriendListEntity])],
	controllers: [FriendListController],
	providers: [FriendListService],
	exports: [FriendListService]
})

export class FriendListModule {}
