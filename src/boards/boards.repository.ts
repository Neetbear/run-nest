import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create_board.dto";
import { BoardStatus } from "./model/boards_status.model";

// @EntityRepository(Board) // 이젠 사라진 기능이라 사용 불가
@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    // async getBoardById(id: number) {
    // 	return await this.findOne({where: {id: id}});
    // }

    async createBoard(createBoard: CreateBoardDto): Promise <Board> {
        const {title, description} = createBoard;
        const currentTime: Date = new Date();
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        await this.save(board);
        return board;
    }
}