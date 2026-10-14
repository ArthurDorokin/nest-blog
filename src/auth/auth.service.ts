import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  register(dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    // хеширует присланный пароль тем же способом и сравнивает. Хеш обратно в пароль не превращается.
    const passwordOk = user ? await bcrypt.compare(dto.password, user.passwordHash) : false;

    if (!user || !passwordOk) throw new UnauthorizedException('Invalid email or password');

    const payload: JwtPayload = { sub: user.id, role: user.role };
    // подписывает токен секретом из настроек модуля
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
