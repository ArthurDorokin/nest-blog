import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity() // "это таблица" (имя по умолчанию: user)
export class User {
  // уникальный номер, который выдаёт база (1, 2, 3...)
  @PrimaryGeneratedColumn()
  id: number;

  // в таблице не может быть двух строк с одинаковым email
  @Column({ unique: true })
  email: string;

  // select: false — хеш не попадает в find/findOneBy, пока не запросишь явно (на логине), так он не утечёт в API
  @Column({ select: false })
  passwordHash: string;

  @Column()
  name: string;

  // enum в БД: допустимы только user/admin. По умолчанию user, админа назначаем вручную
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  // особый декоратор: при создании строки TypeORM сам ставит текущее время
  @CreateDateColumn()
  createdAt: Date;
}
