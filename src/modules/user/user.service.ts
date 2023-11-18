import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma:PrismaService){}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto
      })
      return newUser
    } catch (error) {
      if(error.code == 'P2002'){
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

  async findAll() {
    const allUsers = await this.prisma.user.findMany()
    return allUsers
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if(!user){
      throw new NotFoundException('User is not found!')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id
        },
        data: updateUserDto
      })
      return updateUser
    } catch (error) {
      if(error.code == 'P2025'){
        throw new BadRequestException('Record to update not found!');
      }
      throw new InternalServerErrorException()
    }
  }

  async remove(id: number) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: {
          id
        }
      })
      return deleteUser
    } catch (error) {
      if (error.code == 'P2025') {
        throw new BadRequestException('Record to delete not found!');
      }
      throw new InternalServerErrorException();
    } 
  }
}
