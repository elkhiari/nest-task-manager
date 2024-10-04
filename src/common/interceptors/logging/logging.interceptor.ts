import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { title } from 'process';
import { map, Observable, tap } from 'rxjs';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next.handle()
    .pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`))
    );
  }
}
