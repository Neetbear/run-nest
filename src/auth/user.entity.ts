import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./model/user_role.model";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}