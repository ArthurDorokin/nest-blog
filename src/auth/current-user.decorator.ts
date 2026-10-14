import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './jwt-auth.guard';

// свой параметр-декоратор, как @Body() или @Param(). Вместо @Req() req и req.user в контроллере
// можно писать @CurrentUser() user. Это чище и удобнее для тестов.
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<AuthRequest>().user;
});
