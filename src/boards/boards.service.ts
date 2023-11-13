import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create_board.dto';
import { stat } from 'fs';

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
        return this.boards.find((board) => board.id === id);
    }

    deleteBoardById(id: string): void {
        this.boards.filter((board) => board.id === id);
    }

    updateBoardStatusById(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id)
        board.status = status
        return board
    }
}
