import { IsEmail, IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	public nickname: string;

	@IsString()
	@IsNotEmpty()
	public login: string;
}
