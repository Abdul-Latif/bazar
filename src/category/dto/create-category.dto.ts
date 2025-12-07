import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: "title must be a string" })
    @IsNotEmpty({ message: "title must not be empty" })
    @ApiProperty()
    title: string;

    @IsNotEmpty({ message: "discription must not be empty" })
    @IsString({ message: "discription must be a string" })
    @ApiProperty()
    discription: string;
}
