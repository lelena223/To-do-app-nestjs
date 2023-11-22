import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './common/config/config.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
