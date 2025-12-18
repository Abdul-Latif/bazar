import { Roles } from './../../utilities/common/role-enum';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";
import { ApiProperty } from '@nestjs/swagger';

export class UserSignupDto extends UserSignInDto {
    @IsNotEmpty({ message: "password must not be empty!" })
    @IsString({ message: "password must not be empty!" })
    @ApiProperty({ description: 'enter your name' })
    name: string;

    @IsArray()
    @IsOptional()
    roles?: Roles[]

}