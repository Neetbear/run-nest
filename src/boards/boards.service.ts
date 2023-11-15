import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './model/boards_status.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create_board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './boards.repository';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
    // private boards : Board[] = []; // DB 대체용

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getAllBoards(): Promise <Board[]> { // return 값 타입 지정
        // find는 옵션 안주면 전체 가져온다
        return await this.boardRepository.find();
    }

    createBoard(createBoardDto : CreateBoardDto): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise <Board> {
        // const found = this.boards.find((board) => board.id === id);
        const found = await this.boardRepository.findOne({where: {id: id}});
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        };
        return found;
    }

    async deleteBoardById(id: number): Promise <void> {
        // this.boards.filter((board) => board.id === id);
        const result = await this.boardRepository.delete(id);
        // console.log("result :", result) // result : DeleteResult { raw: [], affected: 0 }

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find board with id ${id}`)
        }
    }

    async updateBoardStatusById(id: number, status: BoardStatus): Promise <Board> {
        // // enum 객체에 맞는 값인지 검증 -> 이런 방법 안쓰고 pipe로 한다
        // if (!Object.values(BoardStatus).includes(status)) {
        //     throw new Error(`Invalid status: ${status}`);
        // }
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board
    }
}
