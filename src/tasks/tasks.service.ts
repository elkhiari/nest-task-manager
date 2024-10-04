import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task> {
        return await this.taskRepository.findOneBy({id});
    }

    async create(task: CreateTaskDto, user : any): Promise<Task> {
        return await this.taskRepository.save({
            ...task,
            userId: user.id
        });
    }

    async update(id: number, task: UpdateTaskDto): Promise<Task> {
        await this.taskRepository.update(id, task);
        return await this.taskRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }

    async removeAll(): Promise<void> {
        await this.taskRepository.clear();
    }

    async completeTask(id: number): Promise<Task> {
        let task = await this.taskRepository.findOneBy({id});
        await this.taskRepository.update(id, { isCompleted: !task.isCompleted });
        return { ...task, isCompleted: !task.isCompleted };
    }

}
