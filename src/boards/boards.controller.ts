import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board} from './boards.model';

@Controller('boards')
export class BoardsController {
    // boardService : BoardsService;
    // constructor(boardService : BoardsService) {
    //     this.boardService = boardService
    // }
    constructor(private boardService : BoardsService) {}

    @Get("/all") 
    getAllBoards(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post("/create")
    createBoard(
        @Body("title") title: string,
        @Body("description") description: string,
    ): Board {
        return this.boardService.createBoard(title, description);
    }
}
