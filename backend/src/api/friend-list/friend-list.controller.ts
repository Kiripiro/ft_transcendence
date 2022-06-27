import { Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { FriendListEntity } from "./friend-list.entity";
import { FriendListService } from "./friend-list.service";

@Controller('friendList')
export class FriendListController {
	@Inject(FriendListService)
	private readonly service: FriendListService;

	@Get()
	public getAllFriends(): Promise<FriendListEntity[]> {
		return this.service.findAll();
	}

	@Get(':id')
	public getFriend(@Param('id', ParseIntPipe) id: number): Promise<FriendListEntity> {
		return this.service.findOne(id);
	}
}