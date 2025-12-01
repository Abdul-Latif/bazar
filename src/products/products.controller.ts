import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/utilities/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utilities/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utilities/guards/autherization.guard';
import { Roles } from 'src/utilities/common/role-enum';
import { AuthorizedRoles } from 'src/utilities/decorators/authorize-roles.decorator';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @AuthorizedRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @CurrentUser() currentUser: UserEntity): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto, currentUser);
  }

  @AuthorizedRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productsService.findOne(+id);
  }

  @AuthorizedRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser: UserEntity): Promise<ProductEntity> {
    return await this.productsService.update(+id, updateProductDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
