import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth_credential.dto';

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

    // @Post("/delete")
    // deleteUser(
    //     @Body("username") username: string
    // ): Promise<void>{
    //     return this.authService.deleteUser(username);
    // }
}
