import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
      console.log(`Request Method: ${req.method}`);
      console.log(`Request URL: ${req.url}`);
      if (req.headers.authorization !== "Bearer 123456") {
        throw new UnauthorizedException("You are not authorized to access this route");
      }
    next();
  }
}
