import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth_credential.dto";
import { UserRole } from "./model/user_role.model";

@Injectable()
export class UserRepository extends Repository <User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise <void> {
        const {username, password} = authCredentialDto;
        const currentTime: Date = new Date();

        const user = this.create({
            username,
            password,
            role: UserRole.User,
            createdAt: currentTime,
            updatedAt: currentTime,
        })
        await this.save(user);
    }
}