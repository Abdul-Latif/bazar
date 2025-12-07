import { IsArray, isDecimal, IsNotEmpty, IsNumber, IsPositive, isPositive, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: "tile must not be empty" })
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty({ message: "tile must not be empty" })
    @ApiProperty()
    discription: string;

    @IsNotEmpty({ message: "price must not be empty" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "price must be a decimal number" })
    @IsPositive({ message: "price must be a positive number" })
    @ApiProperty()
    price: number;

    @IsNotEmpty({ message: "stock should not be empty" })
    @IsNumber({}, { message: "stock should be a number" })
    @Min(0, { message: "stock can not be negative" })
    @ApiProperty()
    stock: number;

    @IsArray({ message: "images should be in array" })
    @IsNotEmpty({ message: "tile must not be empty" })
    @ApiProperty()
    images: string[];

    @IsNotEmpty({ message: "category should not be empty" })
    @IsNumber({}, { message: "category should be a number" })
    @ApiProperty()
    categoryId: number;
}
