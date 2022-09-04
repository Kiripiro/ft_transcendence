import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MatchesHistoryModule } from './matchesHistory/matchesHistory.module';

@Module({
  imports: [UserModule, AuthModule, MatchesHistoryModule],
})
export class ApiModule {}
