import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    //  как forRootAsync для базы: секрет берём из ConfigService, а не из кода.
    JwtModule.registerAsync({
      global: true, // делает JwtService доступным во всех модулях.
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'), //  падает при запуске, если ключа нет в .env
        signOptions: { expiresIn: Number(config.getOrThrow<string>('JWT_EXPIRES_IN_SECONDS')) },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
