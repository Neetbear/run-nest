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
Client -request-> Router -> controller -> service -> Controller -response-> Client

* controller
들어오는 요청을 처리하고 클라이언트에 응답값을 반환한다
@Controller 데코레이터로 데코레이션해서 정의

** Handler
@Get, @Post, @Delete... etc

** body param
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