import { IsArray, isDecimal, IsNotEmpty, IsNumber, IsPositive, isPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: "tile must not be empty" })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "tile must not be empty" })
    discription: string;

    @IsNotEmpty({ message: "price must not be empty" })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "price must be a decimal number" })
    @IsPositive({ message: "price must be a positive number" })
    price: number;

    @IsNotEmpty({ message: "stock should not be empty" })
    @IsNumber({}, { message: "stock should be a number" })
    @Min(0, { message: "stock can not be negative" })
    stock: number;

    @IsArray({ message: "images should be in array" })
    @IsNotEmpty({ message: "tile must not be empty" })
    images: string[];

    @IsNotEmpty({ message: "category should not be empty" })
    @IsNumber({}, { message: "category should be a number" })
    categoryId: number;
}
