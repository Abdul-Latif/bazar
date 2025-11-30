import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Any, Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-singup.dto';
import { compare, hash } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

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

  async signIn(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExist = await this.userRepo.createQueryBuilder('users')
      .addSelect('users.password').where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExist) throw new BadRequestException("email doesn't exist");
    // if (!userExist.password) throw new BadRequestException('password not found');
    const matechedPassword = await compare(userSignInDto.password, userExist.password!);
    if (!matechedPassword) throw new BadRequestException('Bad credentials');
    delete userExist.password;
    return userExist;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('there is no user by this id');
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new BadRequestException('user doesn\'t exist');
    // console.log(updateUserDto);
    Object.assign(user!, updateUserDto);
    const update = await this.userRepo.save(user);
    // console.log(update);
    // console.log(updateUserDto.email);
    return update;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE_TIME!) }
    );
  }
}
