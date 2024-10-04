import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.header('Authorization');
    if (authHeader !== 'Bearer 123456')  return false;
    
    request.user = {
      id: 1,
      username: 'testuser'
    };

    return true;
  }
}
