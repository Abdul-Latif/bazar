import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    @ApiProperty({ description: 'choose your nick name' })
    name: string;

    @IsEmail()
    @ApiProperty({ description: 'enter a valid email' })
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ description: 'enter a proper password' })
    password: string;

}
