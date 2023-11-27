import { Controller, Get, Post, Delete, Patch, Body, Param, ValidationPipe, UsePipes, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus} from './model/boards_status.model';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardStatusValidationPipe } from './pipes/board_status_validation.pipe';
import { Board } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get.user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    // boardService : BoardsService;
    // constructor(boardService : BoardsService) {
    //     this.boardService = boardService
    // }
    private logger = new Logger("BoardsController");
    constructor(private boardService : BoardsService) {}

    @Get("/all") 
    getAllBoards(): Promise <Board[]> {
        return this.boardService.getAllBoards();
    }

    @Get("/all/user") 
    getAllBoardsByUser(
        @GetUser() user: User
    ): Promise <Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardService.getAllBoardsByUser(user);
    }

    @Post("/create")
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise <Board> {
        this.logger.verbose(`User ${user.username} creating a new board. Payload : ${JSON.stringify(createBoardDto)}`) // json stringfy 안하면 [object Object]로 나온다
        return this.boardService.createBoard(createBoardDto, user);
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
        @GetUser() user: User,
    ): Promise <void> {
        return this.boardService.deleteBoardById(id, user);
    }

    @Patch("/:id/status")
    updateBoardStatusById(
        @Param("id", ParseIntPipe) id: number,
        @Body("status", BoardStatusValidationPipe) boardStatus: BoardStatus,
    ): Promise <Board> {
        return this.boardService.updateBoardStatusById(id, boardStatus)
    }
}
