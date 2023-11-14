import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create_board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = []; // DB 대체용

    getAllBoards(): Board[] { // return 값 타입 지정
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto): Board {
        const {title, description} = createBoardDto;
        let currentTime: Date = new Date();
        const board: Board = {
            id : uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
            createdAt: currentTime,
            updatedAt: currentTime
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    deleteBoardById(id: string): void {
        // this.boards.filter((board) => board.id === id);
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id)
    }

    updateBoardStatusById(id: string, status: BoardStatus): Board {
        // // enum 객체에 맞는 값인지 검증 -> 이런 방법 안쓰고 pipe로 한다
        // if (!Object.values(BoardStatus).includes(status)) {
        //     throw new Error(`Invalid status: ${status}`);
        // }

        const board = this.getBoardById(id)
        board.status = status
        return board
    }
}
