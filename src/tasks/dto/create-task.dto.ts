import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({example: 'Task title', description: 'The title of the task'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: 'Task description', description: 'The description of the task'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({example: false, description: 'The status of the task', required: false})
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}
