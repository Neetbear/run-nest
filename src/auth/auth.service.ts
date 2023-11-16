import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth_credential.dto';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOne({where:{username}})

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 발급 (secret + payload)
            const role = user.role;
            const payload = {username, role}; 
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } else if (!user) {
            throw new NotFoundException("user not found");
        } else {
            throw new UnauthorizedException("password not matched");
        }
    }

    // async deleteUser(username: string): Promise<void> {
    //     this.userRepository.delete({username})
    // }
}
