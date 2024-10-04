import { Body, Controller, Get, Param, Post, Put, Delete, Res, HttpStatus, Patch, UsePipes, UseFilters, HttpException, NotFoundException, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ValidationPipe } from 'src/common/validation/validation.pipe';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @UseInterceptors(LoggingInterceptor)
    async findAll(@Res() res: Response) {
        try {
            const tasks = await this.tasksService.findAll();
            return res.status(HttpStatus.OK).json(tasks);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ParseIntPipe())
    async findOne(@Res() res: Response, @Param('id') id: number) {
        try {
            const task = await this.tasksService.findOne(id);
            if (!task) {
                throw new NotFoundException('Task not found');
            }
            return res.status(HttpStatus.OK).json(task);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Res() res: Response, @Body(ValidationPipe) task: CreateTaskDto,@Request() req) {
        try {
            
            const newTask = await this.tasksService.create(task, req.user);
            return res.status(HttpStatus.CREATED).json(newTask);
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() task: UpdateTaskDto) {
        try {
            const updatedTask = await this.tasksService.update(id, task);
            if (!updatedTask) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Task not found' });
            }
            return res.status(HttpStatus.OK).json(updatedTask);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @Patch(':id')
    async completeTask(@Res() res: Response, @Param('id') id: number) {
        try {
            const completedTask = await this.tasksService.completeTask(id);
            if (!completedTask) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'Task not found' });
            }
            return res.status(HttpStatus.OK).json(completedTask);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    @Delete(':id')
    async remove(@Res() res: Response, @Param('id') id: number) {
        try {
            await this.tasksService.remove(id);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}
