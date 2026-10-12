import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // регистрирует сущность User
  controllers: [UsersController], // кто принимает запросы.
  providers: [UsersService], // сервисы, которые можно внедрять.
  exports: [UsersService],
})
export class UsersModule {}
