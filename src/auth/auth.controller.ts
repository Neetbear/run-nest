import { Body, Controller, Post, UseGuards, ValidationPipe, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth_credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get.user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post("/signup")
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ): Promise <void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post("/signin")
    signIn(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post("/test")
    @UseGuards(AuthGuard()) // Guards도 기본 미들웨어의 한 종류
    test( @GetUser() user: User ) { // 커스텀 데코레이터인 GetUser 사용
        console.log("user", user);
    }

    // @Post("/delete")
    // deleteUser(
    //     @Body("username") username: string
    // ): Promise<void>{
    //     return this.authService.deleteUser(username);
    // }
}
