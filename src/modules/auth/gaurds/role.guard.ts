import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorator/role.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),   
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const user = await context.switchToHttp().getRequest().user;
    
    if(user.role === requiredRoles){
        return true
    }
    throw new ForbiddenException('You do not have access');
  }
}
