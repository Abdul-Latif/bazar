import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignupDto {
    @IsNotEmpty({ message: "password must not be empty!" })
    @IsString({ message: "password must not be empty!" })
    name: string;

    @IsNotEmpty({ message: "password must not be empty!" })
    @IsEmail({}, { message: 'provide a valid email address!' })
    email: string;

    @IsNotEmpty({ message: "password must not be empty!" })
    @MinLength(5, { message: 'passowrd must be at least 5 chars' })
    password: string;
}