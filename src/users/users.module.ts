import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { DBConnectionService } from '../db/connection.db';

@Module({
  imports: [],
  providers: [UsersService, UserRepository, DBConnectionService],
  exports: [UsersService]
})
export class UsersModule {}
