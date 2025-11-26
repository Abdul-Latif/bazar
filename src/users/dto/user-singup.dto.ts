import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignupDto extends UserSignInDto {
    @IsNotEmpty({ message: "password must not be empty!" })
    @IsString({ message: "password must not be empty!" })
    name: string;

}