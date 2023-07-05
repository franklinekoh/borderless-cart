import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { DBConnectionService } from '../db/connection.db';
import { JwtConfig } from './auth.config';
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [AuthController],
  providers: [AuthService, DBConnectionService],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: JwtConfig.secret,
      signOptions: { expiresIn: `${JwtConfig.expires}mins` },
    }),]
})
export class AuthModule {}
