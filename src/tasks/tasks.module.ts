import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ValidationPipe } from 'src/common/validation/validation.pipe';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TasksController],
    providers: [TasksService, ParseIntPipe, ValidationPipe],
    exports: [TasksModule],
})
export class TasksModule {}
