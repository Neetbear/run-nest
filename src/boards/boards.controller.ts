import { Controller, Get, Post, Delete, Patch, Body, Param, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus} from './model/boards_status.model';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardStatusValidationPipe } from './pipes/board_status_validation.pipe';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
    // boardService : BoardsService;
    // constructor(boardService : BoardsService) {
    //     this.boardService = boardService
    // }
    constructor(private boardService : BoardsService) {}

    @Get("/all") 
    getAllBoards(): Promise <Board[]> {
        return this.boardService.getAllBoards();
    }

    @Post("/create")
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
    ): Promise <Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get("/:id")
    getBoardById(
        @Param("id", ParseIntPipe) id: number,
    ): Promise <Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoardById(
        @Param("id", ParseIntPipe) id: number,
    ): Promise <void> {
        return this.boardService.deleteBoardById(id)
    }

    @Patch("/:id/status")
    updateBoardStatusById(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) boardStatus: BoardStatus,
    ): Promise <Board> {
        return this.boardService.updateBoardStatusById(id, boardStatus)
    }
}
