import { PartialType } from '@nestjs/mapped-types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity)
  private categoryRepo: Repository<CategoryEntity>) { }

  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity): Promise<CategoryEntity> {
    const category = this.categoryRepo.create(createCategoryDto);
    category.addedBy = currentUser;
    return await this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    return await this.categoryRepo.findOne({
      where: { id: id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true
        }
      }
    });
  }

  async update(id: number, fields: Partial<UpdateCategoryDto>) {
    const category = await this.findOne(id);
    if (!category) throw new BadRequestException("category doestn't exist");
    Object.assign(category, fields);
    return await this.categoryRepo.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
