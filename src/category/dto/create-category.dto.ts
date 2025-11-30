import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: "title must be a string" })
    @IsNotEmpty({ message: "title must not be empty" })
    title: string;

    @IsNotEmpty({ message: "discription must not be empty" })
    @IsString({ message: "discription must be a string" })
    discription: string;
}
