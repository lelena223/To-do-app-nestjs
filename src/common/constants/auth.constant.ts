import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

const secret = configService.get<string>('SECRET');
const port = configService.get<string>('PORT');
export const jwtConstants = {
  secret: secret,
  port: port
};
