import { Role } from '../users/entities/user.entity';

export interface JwtPayload {
  sub: number; // id пользователя; "sub" (subject) - стандартное имя поля в JWT
  role: Role;
}
