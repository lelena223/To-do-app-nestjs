import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService){}
  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: loginAuthDto.username
        }
      })
      if(!user){
        throw new NotFoundException('User is not found!')
      }
      if(loginAuthDto.password != user.password){
        throw new BadRequestException('Password is invalid!')
      }

      const payload = { id: user.id }
      const accessToken = await this.jwtService.signAsync(payload)
      return {accessToken}
    } catch (error) {
      console.log(error);
    }
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
      console.log(error);
    }
  }
}
