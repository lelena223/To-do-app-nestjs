import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService){}
  async create(createTaskDto: CreateTaskDto) {
    try {
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        status: createTaskDto.status,
        deadline: createTaskDto.deadline,
      },
    });
    return newTask
    } catch (error) {
      if(error.code == 'P2002') {
        throw new NotFoundException('Task already exists!')
      }
    }
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany();
    return tasks
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    })
    if(!task) {
      throw new NotFoundException('Task not found!')
    }
    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const updateTask = await this.prisma.task.update({
        where: {
          id
        },
        data: {
          name: updateTaskDto.name,
          description: updateTaskDto.description,
          status: updateTaskDto.status,
          deadline: updateTaskDto.deadline
        }
      })      
      return updateTask
    } catch (error) {
      if(error.code == 'P2025') {
        throw new NotFoundException('Task not found!')
      }
    }
  }

  async remove(id: number) {
    try {
      const deleteTask = await this.prisma.task.delete({
        where: {
          id
        }
      }) 
      return deleteTask
    } catch (error) {
      console.log(error);
      if(error.code == 'P2025') {
        throw new NotFoundException('Task not found!')
      }
    }
  }
}
