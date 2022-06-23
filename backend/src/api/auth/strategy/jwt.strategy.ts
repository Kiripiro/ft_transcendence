import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from "src/api/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(
		private readonly userService: UserService
	) {
		super({
		  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		  ignoreExpiration: false,
		  secretOrKey: 'super-cat',
		});
	}

	async validate(payload: any) {
		console.log('validate()', payload);
		const user = await this.userService.getUserById(payload.id);
		if (user)
			return payload;
		return undefined;
	}
}
