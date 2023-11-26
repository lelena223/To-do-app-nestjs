import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserHasTaskService } from './user-has-task.service';
import { CreateUserHasTaskDto } from './dto/create-user-has-task.dto';
import { UpdateUserHasTaskDto } from './dto/update-user-has-task.dto';

@Controller('user-has-task')
export class UserHasTaskController {
  constructor(private readonly userHasTaskService: UserHasTaskService) {}

  @Post()
  create(@Body() createUserHasTaskDto: CreateUserHasTaskDto) {
    return this.userHasTaskService.create(createUserHasTaskDto);
  }

  @Get()
  findAll() {
    return this.userHasTaskService.findAll();
  }

  @Get('/one')
  findOne(@Query('userId') userId: number, @Query('taskId') taskId: number) {
    return this.userHasTaskService.findOne(+userId, +taskId);
  }

  @Patch()
  update(
    @Query('userId') userId: number,
    @Query('taskId') taskId: number,
    @Body() updateUserHasTaskDto: UpdateUserHasTaskDto,
  ) {
    return this.userHasTaskService.update(
      +userId,
      +taskId,
      updateUserHasTaskDto,
    );
  }

  @Delete()
  remove(@Query('userId') userId: number, @Query('taskId') taskId: number) {
    return this.userHasTaskService.remove(+userId, +taskId);
  }
}
