import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class FavoritesService {
  constructor(@InjectRepository(FavoriteEntity)
  private favRepo: Repository<FavoriteEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private prodRepo: Repository<ProductEntity>) { }

  async addToFavorites(userid: number, productId: number) {
    const product = await this.prodRepo.findOne({ where: { id: productId } });
    if (!product) throw new HttpException('product not found', HttpStatus.NOT_FOUND);

    const user = await this.userRepo.findOne({ where: { id: userid } });
    if (!user) throw new HttpException('product not found', HttpStatus.NOT_FOUND);

    const fav = await this.favRepo.findOne({
      where: {
        user: { id: userid },
        product: { id: productId },
      }, withDeleted: true
    });
    // console.log(fav)
    // if (fav) {
    //   throw new HttpException('already favorited', HttpStatus.CONFLICT);
    // }
    // else if (product.id) {
    //   const fav = await this.favRepo.findOne({ where: { product: { id: productId } } })
    //   if (!fav) throw new BadRequestException();
    //   fav.Deleted_Date = null;
    //   return await this.favRepo.save(fav);
    // }
    // else if (!fav) {
    //   const fav = this.favRepo.create({ user, product });
    //   return await this.favRepo.save(fav)
    // }

    if (fav && fav.Deleted_Date) {
      fav.Deleted_Date = null;
      return await this.favRepo.save(fav);
    }

    if (fav) throw new HttpException('already favorited', HttpStatus.CONFLICT);

    const favorite = this.favRepo.create({ user, product });
    return await this.favRepo.save(favorite);
  }

  async findAllFavorites(userId: number) {
    if (!userId) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return await this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['product']
    })
  }



  async removeFromFavorites(userId: number, productId: number) {
    const fav = await this.favRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId }
      }
    });

    if (!fav) throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
    await this.favRepo.softDelete(fav.id);
  }
}
