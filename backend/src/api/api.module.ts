import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FriendListModule } from './friend-list/friend-list.module';

@Module({
  imports: [UserModule, FriendListModule, AuthModule],
})
export class ApiModule {}
