import { PartialType } from '@nestjs/mapped-types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity)
  private productRepo: Repository<ProductEntity>,
    private readonly categoryService: CategoryService) { }

  async create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    if (!category) throw new BadRequestException("category not found");
    const product = this.productRepo.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepo.save(product)
  }


  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepo.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: {
        addedBy: true,
        category: true,
      },
      select: {
        addedBy: {
          id: true,
          name: true,
        },
        category: {
          id: true,
          title: true,
        }
      }
    })
    if (!product) throw new BadRequestException('product is not found');
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
      where: { id: id }
    })
    if (!product) throw new BadRequestException("product doesn't exist");
    Object.assign(product, updateProductDto);
    product.addedBy = currentUser;
    const category = await this.categoryService.findOne(+updateProductDto.categoryId!);
    if (!category) throw new BadRequestException("category doesnt exist ");
    product.category = category
    return await this.productRepo.save(product);

  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
