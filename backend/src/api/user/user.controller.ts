import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CreateUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  public getAllUsers(): Promise<UserEntity[]> {
    return this.service.getAllUsers();
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
	return this.service.getUserById(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
	const user = this.service.createUser(body);
	if (user)
		return user;
	/*else {
		throw new BaseExceptionFilter;
	}*/
  }
}
