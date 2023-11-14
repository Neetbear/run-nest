import { Controller, Get, Post, Delete, Patch, Body, Param, ParseUUIDPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus} from './boards.model';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardStatusValidationPipe } from './pipes/board_status_validation.pipe';

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
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get("/:id")
    getBoardById(
        @Param("id", ParseUUIDPipe) id: string,
    ): Board {
        return this.boardService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoardById(
        @Param("id", ParseUUIDPipe) id: string,
    ): void {
        this.boardService.deleteBoardById(id)
    }

    @Patch("/:id/status")
    updateBoardStatusById(
        @Param("id", ParseUUIDPipe) id: string,
        @Body("status", BoardStatusValidationPipe) boardStatus: BoardStatus,
    ): Board {
        return this.boardService.updateBoardStatusById(id, boardStatus)
    }
}
