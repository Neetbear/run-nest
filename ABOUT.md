# 구성
- eslintrc.js
라이브러리 
타입스크립트를 쓰는 가이드라인 제시, 문법 오류 알림 등의 역할
코드 포켓터 역할도 가능은 하다

- .prettierrc
주로 코드 형식을 맞춰주는 역할
에러가 아닌 코드 포멧터의 역할

- nest-cli.json
nest 프로젝트를 위한 특정한 설정 파일

- tsconfig.json
타입스크립트 컴파일 설정 파일

- tsconfig.build.json
tsconfig.json의 연장선에 있는 파일로 build시에 필요한 설정

- package.json
build, format, start 

- src
프로젝트 로직 파일 

- API 동작 구조
Client -request-> Router -> controller -> service -> repository -> service -> Controller -response-> Client

* controller
들어오는 요청을 처리하고 클라이언트에 응답값을 반환한다
@Controller 데코레이터로 데코레이션해서 정의

** Handler
@Get, @Post, @Delete... etc

** body
``` ts
@Post("/create")
createBoard(@Body() body): Board {} // body 전체 받기

@Post("/create")
createBoard(
    @Body("title") title: string, // body에서 특정 원하는 값들만 받기
    @Body("description") description: string, 
): Board {
    return this.boardService.createBoard(title, description);
}
```

** param
``` ts
@Get("/:id")
getBoardById(
    @Param() params: string[], // param 전체
): Board {
    return this.boardService.getBoardById(id);
}

@Get("/:id")
getBoardById(
    @Param("id") id: string, // 선택해서 가져오기
): Board {
    return this.boardService.getBoardById(id);
}
```

* providers
종속성으로 주입할 수 있다
서비스, 리포지토리, 팩토리, 헬퍼 등을 컨트롤러에서 사용할 수 있게 넣어주는게 종속성 주입

* service
@injectable 데코레이터로 감싸져서 모듈에 제공
애플리케이션 전체에서 사용 가능
실제 기능 부분
컨트롤러에 주입 
``` ts
constructor(private boardService : BoardsService) {}

// boardService : BoardsService; // 프로퍼티 선언
// constructor(boardService : BoardsService) { // 파라미터 -> 접근 제한자 사용시 암묵적으로 클래스 프로퍼티
//     this.boardService = boardService // 파라미터 => 프로퍼티
// }
```

* model
interface 아니면 class 사용

* dto (data transfer object)
계층간 데이터 교환을 위한 객체
DB에서 데이터를 얻을때 등에서 사용
데이터 유효성 체크에 효율적이며 더 안정적인 코드 작성 가능
일반적으로 class가 더 선호된다 - 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할때 더 유용

- 구현 목표
BoardModule
AuthModule

- 모듈이란?
@Module 데코레이터로 주석이 달린 클래스
애플리케이션에는 하나 이상의 모듈이 필요하다
루트 모듈(app module)은 nest의 시작점이다
밀접하게 관련된 기능 집합 - 구성 요소를 구성하는 효과적인 방법
모듈의 기본은 Singleton - 여러 모듈 간에 쉽게 공급자의 동일한 인스턴스를 공유 할 수 있다

- 생성 명령어
* module 생성
nest g module boards

* controller 생성
nest g controller boards --no-spec
** --no-spec -> 테스트를 위한 코드 생성 x

* service 생성
nest g service boards --no-spec


- pipe
@injectable () 데코레이터 클래스
data transformation과 data validation을 위해서 사용
컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동
Nest는 메소드가 호출되기 직전에 파이프를 삽입하고 파이프는 메소드로 향하는 인수를 수신하여 이에 대해 작동

* data transformation
입력 데이터를 원하는 형식으로 변환 (string -> int)

* data validation
입력 데이터의 유효성 체크 (string length 등)

* binding pipes
파이프 사용법 : Handler-level Pipes, Parameter-level Pipes, Global-level Pipes
Handler-level Pipes : 특정 핸들러만
``` ts
@Post("/create")
@UsePipes(ValidationPipe)
createBoard(
    @Body() createBoardDto: CreateBoardDto,
): Board {
    return this.boardService.createBoard(createBoardDto);
}
```
Parameter-level Pipes : 특정 파라미터에만
```ts
@Get("/:id")
getBoardById(
    @Param("id", ParseUUIDPipe) id: string,
): Board {
    return this.boardService.getBoardById(id);
}
```
Global-level Pipes : 애플리케이션 레벨 -> 클라이언트에서 들어오는 모든 요청에 적용

* Built-in Pipes
Nest에서 프로젝트 생성시 기본적으로 존재하는 6가지 파이프
Validation Pipe
ParseInt Pipe
ParseBool Pipe
ParseArray Pipe
ParseUUID Pipe
DefaultValue Pipe

* 추가 라이브러리
class-validator, class-transformer
npm install class-validator class-transformer --save

* 커스텀 파이프
PipeTransform 인터페이스
transform 메소드 - 파라미터로 value와 metadata
```
value sdfdsf
metadata { metatype: [Function: String], type: 'body', data: 'status' }
```

- Postgres
PostgresSQL
pgAdmin

- TypeORM (object relational mapping)
node.js에서 실행되고 typesript로 작성된 객체 관계형 매퍼 라이브러리
MySQL, PostgresSQL, MariaDB, SQlite, MSSQL, Oracle, SAP Hana, WebSQL과 같은 여러 데이터베이스 지원

* ORM
객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업
객체와 관계형 DB를 매핑
```
npm install pg typeorm @nestjs/typeorm --save
```

* entities
@Entity()
데이터베이스 개체

- Repository
엔티티 객체와 함께 작동하며 DB CRUD 처리 
service로부터 받은 DB 관련 동작 처리
@EntityRepository()

* service에 repository 주입
``` ts
constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
) {}
```

* remove vs delete
remove : 무조건 삭제라 없어서 삭제 실패시 에러 발생
delete : 만약 해당 조건의 데이터가 존재시에만 삭제 (없으면 아무런 영향이 없다)