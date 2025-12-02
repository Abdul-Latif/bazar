import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty({ message: "cateogry Id must not be empty" })
    productId: number;

    @IsNumber()
    @IsNotEmpty({ message: "cateogry Id must not be empty" })
    ratings: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
