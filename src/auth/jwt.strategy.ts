import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity"
import * as config from 'config';

const jwtConfig = config.get("jwt");

// 다른 곳에서도 사용할 수 있게
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ) {
        super({
            secretOrKey : process.env.JWT_SECRET || jwtConfig.secret,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({where: {username}});
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}