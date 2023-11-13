import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards : Board[] = []; // DB 대체용

    getAllBoards(): Board[] { // return 값 타입 지정
        return this.boards;
    }

    createBoard(title: string, description: string): Board {
        const board: Board = {
            id : uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }
}
