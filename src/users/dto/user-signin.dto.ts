import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
    @IsNotEmpty({ message: "password must not be empty!" })
    @IsEmail({}, { message: 'provide a valid email address!' })
    @ApiProperty({ description: 'enter your email' })
    email: string;

    @IsNotEmpty({ message: "password must not be empty!" })
    @MinLength(5, { message: 'passowrd must be at least 5 chars' })
    @ApiProperty({ description: 'enter your password' })
    password: string;
}