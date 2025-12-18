import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthorizeGuard } from 'src/utilities/guards/autherization.guard';
import { CurrentUser } from 'src/utilities/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utilities/guards/authentication.guard';


@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @UseGuards(AuthenticationGuard)
  @Post(':productId')
  async addToFavorites(@CurrentUser() CurentUser: UserEntity, @Param('productId') productId: number) {
    return this.favoritesService.addToFavorites(CurentUser.id, productId);
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  async findAllFavorites(@CurrentUser() currentUser: UserEntity) {
    return await this.favoritesService.findAllFavorites(currentUser.id);
  }


  @UseGuards(AuthenticationGuard)
  @Delete(':productId')
  async removeFromFavorites(@Param('productId') productId: number, @CurrentUser() currentUser: UserEntity) {
    return await this.favoritesService.removeFromFavorites(currentUser.id, productId);
  }
}
