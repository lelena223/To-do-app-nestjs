import { Module } from '@nestjs/common';
import { UserHasTaskService } from './user-has-task.service';
import { UserHasTaskController } from './user-has-task.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserHasTaskController],
  providers: [UserHasTaskService, PrismaService],
})
export class UserHasTaskModule {}
