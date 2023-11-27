import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get("jwt");

@Module({
  imports: [
    PassportModule.register({defaultStrategy:"jwt"}), // jwt로 passport 사용
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // 서명에 사용할 비밀키
      signOptions:{
        expiresIn: process.env.JWT_EXPIRES_IN || jwtConfig.expiresIn // 한 시간 유효
      }
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy
  ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
