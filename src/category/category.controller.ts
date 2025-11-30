import { PartialType } from '@nestjs/mapped-types';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/utilities/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utilities/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utilities/guards/autherization.guard';
import { CategoryEntity } from './entities/category.entity';
import { AuthorizedRoles } from 'src/utilities/decorators/authorize-roles.decorator';
import { Roles } from 'src/utilities/common/role-enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @AuthorizedRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CategoryEntity> {
    return this.categoryService.create(createCategoryDto, currentUser);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @AuthorizedRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
