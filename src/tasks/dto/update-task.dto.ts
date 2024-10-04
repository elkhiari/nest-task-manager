import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {

    @ApiProperty({example: 'Task title', description: 'The title of the task', required: false})
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({example: 'Task description', description: 'The description of the task', required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({example: false, description: 'The status of the task', required: false})
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}
