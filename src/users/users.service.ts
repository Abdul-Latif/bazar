import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-singup.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private userRepo: Repository<UserEntity>
  ) { }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  async signUp(userSignupDto: UserSignupDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(userSignupDto.email);
    if (userExist) throw new BadRequestException("email already used please sign in");
    userSignupDto.password = await hash(userSignupDto.password, 10);
    let newUser = this.userRepo.create(userSignupDto);
    newUser = await this.userRepo.save(newUser);
    const { password, ...safeUser } = newUser;
    return safeUser;

  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) throw new BadRequestException('user doesn\'t exist');

  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}
