import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {message : "password only accepts english and number"}) // RegExp 사용, option (에러 메시지 등)
    password: string;
}