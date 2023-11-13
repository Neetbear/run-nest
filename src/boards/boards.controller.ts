import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus} from './boards.model';
import { CreateBoardDto } from './dto/create_board.dto';

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
        @Body() createBoardDto: CreateBoardDto,
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get("/:id")
    getBoardById(
        @Param("id") id: string,
    ): Board {
        return this.boardService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoardById(
        @Param("id") id: string,
    ): void {
        this.boardService.deleteBoardById(id)
    }

    @Patch("/:id/status")
    updateBoardStatusById(
        @Param("id") id: string,
        @Body("status") boardStatus: BoardStatus,
    ): Board {
        return this.boardService.updateBoardStatusById(id, boardStatus)
    }
}
