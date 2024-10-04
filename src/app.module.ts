import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthMiddleware } from './common/middleware/auth/auth.middleware';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; 

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          const filename = `${Date.now()}.${ext}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tasks',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude({ path: 'tasks', method: RequestMethod.GET })
    }
}
