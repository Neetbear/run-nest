import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth_credential.dto";
import { UserRole } from "./model/user_role.model";
import * as bcrypt from "bcryptjs"

@Injectable()
export class UserRepository extends Repository <User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise <void> {
        const {username, password} = authCredentialDto;
        const currentTime: Date = new Date();

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            username,
            password: hashedPassword,
            role: UserRole.User,
            createdAt: currentTime,
            updatedAt: currentTime,
        })
        try {
            await this.save(user);
        } catch(error) {
            if(error.code === "23505") {
                throw new ConflictException("Existing username"); // 409 리소스와 요청이 충돌 (중복 데이터 or 이미 존재하는 리소스 덮어쓰려는 경우)
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}