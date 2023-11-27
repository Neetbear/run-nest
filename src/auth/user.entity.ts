import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "./model/user_role.model";
import { Board } from "src/boards/boards.entity";

@Entity()
@Unique(["username"])
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

    @OneToMany(type => Board, board => board.user, {eager: true})
    boards: Board[]
}