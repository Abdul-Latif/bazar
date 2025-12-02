import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(ReviewEntity)
  private readonly reviewRepo: Repository<ReviewEntity>,
    private readonly productService: ProductsService
  ) { }

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const review = this.reviewRepo.create(createReviewDto);
    const product = await this.productService.findOne(+createReviewDto.productId)
    if (!product) throw new NotFoundException("product is not found");
    review.user = currentUser;
    review.product = product;
    return await this.reviewRepo.save(review);

  }

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepo.find();
  }


  async findOne(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepo.findOne(
      {
        where: { id: id },
        relations: {
          user: true,
          product: true,
        },
        select: {
          product: {
            id: true,
            title: true,
            price: true
          },
          user: {
            name: true,
            email: true
          }
        }
      }
    )
    if (!review) throw new NotFoundException("there are no reviews available");
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const review = await this.reviewRepo.findOne({ where: { id: id } });
    if (!review) throw new NotFoundException("review not found");
    const product = await this.productService.findOne(+updateReviewDto.productId!);
    if (!product) throw new NotFoundException("product not found");
    Object.assign(review, updateReviewDto);
    review.user = currentUser;
    review.product = product;
    return await this.reviewRepo.save(review);

  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
