import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserHasTaskDto } from './dto/create-user-has-task.dto';
import { UpdateUserHasTaskDto } from './dto/update-user-has-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserHasTaskService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserHasTaskDto: CreateUserHasTaskDto) {
    try {
      const newUserHasTask = await this.prisma.user_Has_Task.create({
        data: {
          userId: createUserHasTaskDto.userId,      
          taskId: createUserHasTaskDto.taskId,
        },
      });
      return newUserHasTask;
    } catch (error) {
      if (error.code == 'P2003') {
        if (error.meta.field_name == 'userId') {
          throw new NotFoundException('User not found!');
        } else if (error.meta.field_name == 'taskId') {
          throw new NotFoundException('Task not found!');
        }
      } else if (error.code == 'P2002') {
        throw new BadRequestException('User has task already exists!');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const allUserHasTasks = await this.prisma.user_Has_Task.findMany();
    return allUserHasTasks;
  }

  async findOne(userId: number, taskId: number) {
    const userHasTask = await this.prisma.user_Has_Task.findUnique({
      where: {
        userId_taskId: {
          userId: userId,
          taskId: taskId,
        },
      },
    });
    if (!userHasTask) {
      throw new NotFoundException('User has task not found!');
    }
    return userHasTask;
  }

  async update(
    userId: number,
    taskId: number,
    updateUserHasTaskDto: UpdateUserHasTaskDto,
  ) {
    try {
      const updatedUserHasTask = await this.prisma.user_Has_Task.update({
        where: {
          userId_taskId: {
            userId: userId,
            taskId: taskId,
          },
        },
        data: {
          userId: updateUserHasTaskDto.userId,
          taskId: updateUserHasTaskDto.taskId,
        },
      });
      return updatedUserHasTask;
    } catch (error) {
      if (error.code == 'P2025') {
        throw new NotFoundException('User has task not found!');
      }
      if (error.code == 'P2003') {
        if (error.meta.field_name == 'userId') {
          throw new NotFoundException('User not found!');
        } else if (error.meta.field_name == 'taskId') {
          throw new NotFoundException('Task not found!');
        }
      }
      if (error.code == 'P2002') {
        throw new BadRequestException('User has task already exists!');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(userId: number, taskId: number) {
    try {
      const deleteUserHasTask = await this.prisma.user_Has_Task.delete({
        where: {
          userId_taskId: {
            userId: userId,
            taskId: taskId,
          },
        },
      });
      return deleteUserHasTask;
    } catch (error) {
      if (error.code == 'P2025') {
        throw new NotFoundException('User has task not found!');
      }
      throw new InternalServerErrorException();
    }
  }
}
