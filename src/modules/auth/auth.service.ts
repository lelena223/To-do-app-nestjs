import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/common/constants/auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}
  async login(loginAuthDto: LoginAuthDto) {
      const user = await this.prisma.user.findUnique({
        where: {
          username: loginAuthDto.username
        }
      })
      if(!user){
        throw new NotFoundException('User is not found!')
      }

      const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password)
      if (!isPasswordValid) {
        throw new BadRequestException('Password is invalid!');
      }

      const payload = { id: user.id }
      const accessToken = await this.jwtService.signAsync(payload)
      return {accessToken}
  }

  async register(createAuthDto: CreateAuthDto) {
    try{
      const saltOrRounds = 10;
      const password = createAuthDto.password;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);
      const newUser = await this.prisma.user.create({
        data: {
          username: createAuthDto.username,
          password: passwordHash,
          name: createAuthDto.name,
          email: createAuthDto.email,
          phone: createAuthDto.phone,
          gender: createAuthDto.gender,
          age: createAuthDto.age,
          address: createAuthDto.address
        }
      }) 

      const payload = {id: newUser.id}
      const accessToken = await this.jwtService.signAsync(payload)
      return { newUser, accessToken }
    }catch(error){
      if (error.code == 'P2002') {
        if (error.meta.target == 'User_username_key') {
          throw new BadRequestException('Username already exists!');
        } else if (error.meta.target == 'User_email_key') {
          throw new BadRequestException('Email already exists!');
        } else if (error.meta.target == 'User_phone_key') {
          throw new BadRequestException('Phone number already exists!');
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
