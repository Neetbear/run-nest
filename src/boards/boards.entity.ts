import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./model/boards_status.model";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;
}