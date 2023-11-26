import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './common/config/config.module';
import { TaskModule } from './modules/task/task.module';
import { UserHasTaskModule } from './modules/user-has-task/user-has-task.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AppConfigModule, TaskModule, UserHasTaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
