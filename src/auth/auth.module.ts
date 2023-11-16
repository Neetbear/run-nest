import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:"jwt"}), // jwt로 passport 사용
    JwtModule.register({
      secret: "secret1234", // 서명에 사용할 비밀키
      signOptions:{
        expiresIn: 60*60 // 한 시간 유효
      }
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository
  ]
})
export class AuthModule {}
